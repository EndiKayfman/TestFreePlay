import { _decorator, Component, Node, Vec3, tween, Button, EventHandler, EventMouse } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('FloatingImageUI')
export class FloatingImageUI extends Component {
    @property(Node)
    imageNode: Node = null; // ������ � ���������

    @property(Node)
    buttonNode: Node = null; // ������ ��� ����������� ��������� ��������

    @property
    moveDistance: number = 50; // ���������� �����/����

    @property
    moveDuration: number = 1; // ������������ �������� ��������

    @property
    showInterval: number = 2; // �������� ��������� ��������

    private isImageVisible: boolean = false; // ����, ������������ �� ��������
    private stopShowing: boolean = false; // ����, ����� ���������� ���������� ���������

    onLoad() {
        // ������������� ��������� ��������� ����������� (��� ������)
        if (this.imageNode) {
            this.imageNode.active = false;
        }

        // ��������� ���������� �� ������
        if (this.buttonNode) {
            this.buttonNode.on(Node.EventType.MOUSE_DOWN, this.onStopImageAppearance, this);  // ���������� onMouseDown
        }

        // ��������� ������ �� ��������� ��������
        this.schedule(this.toggleImage, this.showInterval, Infinity);

        // �������� �������� ����� ��� ������
        this.showImage();
    }

    // ����� ��� ��������� ��������
    toggleImage() {
        if (this.stopShowing) return; // ���� ���� ��������� ����������, ������� �� ������

        this.showImage();
    }

    // ����� ��� ������ ��������
    showImage() {
        if (!this.imageNode || this.isImageVisible) return;

        this.isImageVisible = true;
        this.imageNode.active = true;

        // ��������� ��������� ������� ��������
        const initialPos = this.imageNode.position.clone();

        // �������� �������� �������� �����/���� �� ��� Y
        tween(this.imageNode)
            .to(this.moveDuration, { position: new Vec3(initialPos.x, initialPos.y + this.moveDistance, initialPos.z) }) // ������� �����
            .to(this.moveDuration, { position: new Vec3(initialPos.x, initialPos.y - this.moveDistance, initialPos.z) }) // ������� ����
            .to(this.moveDuration, { position: initialPos }) // ���������� � �������� ���������
            .call(() => {
                // ��������� ��������, �������� ��������
                this.imageNode.active = false;
                this.isImageVisible = false;
            })
            .start();
    }

    // ����� ��� ��������� ��������� �������� (�� ������� �� ������)
    onStopImageAppearance(event: EventMouse) {
        // ���� ��� ����������� � ������ �� ������
        if (this.stopShowing) return;

        // ������������� ����� ��������
        this.stopShowing = true;
        this.imageNode.active = false; // ���������� ������ ��������

        // ������������� ������, ����� ������ �� ��������� toggleImage
        this.unschedule(this.toggleImage);

        console.log("��������� �������� �����������.");
    }
}
