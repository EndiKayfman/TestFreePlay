import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target: Node = null; // ������

    @property
    followSpeed: number = 5; // �������� ����������

    private offset: Vec3 = new Vec3();

    onLoad() {
        if (this.target) {
            this.offset = this.node.position.clone().subtract(this.target.position);
        }
    }

    update(deltaTime: number) {
        if (!this.target) return;

        let targetPos = this.target.position.clone().add(this.offset);
        let currentPos = this.node.position.clone();

        // ������� �������� ������ (Lerp)
        let newPos = currentPos.lerp(targetPos, deltaTime * this.followSpeed);

        this.node.setPosition(newPos);
    }
}
