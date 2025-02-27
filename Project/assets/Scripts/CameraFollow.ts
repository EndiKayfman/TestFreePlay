import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target: Node = null; // ������

    @property
    followSpeed: number = 5; // ��������� �������� ����������

    private offset: Vec3 = new Vec3();
    private isFollowing: boolean = true; // ����, ������ �� �� �������
    private stopSpeed: number = 1; // �������� ��������� ������
    private initialY: number = 0; // ��������� ������ ������

    onLoad() {
        if (this.target) {
            this.offset = this.node.position.clone().subtract(this.target.position);
            this.initialY = this.node.position.y; // ��������� ��������� �������� ��� Y
        }
    }

    update(deltaTime: number) {
        if (!this.target) return;

        let targetPos = this.target.position.clone().add(this.offset);
        let currentPos = this.node.position.clone();

        // ������� �������� ������ (Lerp)
        let newPos = currentPos.lerp(targetPos, deltaTime * this.followSpeed);

        // ��������� ��� Y (������ �� ����� ��������� �� ���������)
        newPos.y = this.initialY; // ������ ������ �������� �� ��� �� ������ Y

        // ���� ������ �����������, ��������� � ��������
        if (!this.isFollowing) {
            this.followSpeed = Math.max(0, this.followSpeed - deltaTime * this.stopSpeed); // ���������� ������
        }

        this.node.setPosition(newPos);
    }

    // ����� ��� ��������� ����������
    stopFollowing() {
        this.isFollowing = false;
    }

    // ����� ��� ������������� ����������
    startFollowing() {
        this.isFollowing = true;
        this.followSpeed = 5; // ���������� ��������� ��������
    }
}
