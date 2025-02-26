import { _decorator, Component, Collider, Node, Label, tween, UIOpacity, Vec3, director, sys, ITriggerEvent, Animation } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('RoadFinish')
export class RoadFinish extends Component {

    @property(Animation)
    carAnimation: Animation | null = null;

    @property(Node)
    failText: Node = null;

    @property(Node)
    darkOverlay: Node = null;

    @property(Node)
    downloadButton: Node = null;

    @property(Node)
    retryButton: Node = null;

    onLoad() {
        let collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
            console.log('������� ���������������');
        } else {
            console.error('��������� �� ������ �� ������� RoadFinish');
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        console.log(`������ ${event.otherCollider.node.name} �������� ������`);

        // ���������, ��� ����������� ������ ������
        if (event.otherCollider.node.name === "Car") {
            console.log("������ �������� ������!");

            // ���� � ������ ���� �������� � ���������
            if (this.carAnimation) {
                this.carAnimation.play();
                console.log("�������� ��������!");
            } else {
                console.warn("�������� �� �������!");
            }

            this.scheduleOnce(() => {
                this.showFailScreen();
            }, 1.5); // �������� 1.5 ������� ����� ���������� "FAIL"
        }

        let car = event.otherCollider.node.getComponent('CarController');
        if (car) {
            car.stopCar();
        }
    }

    showFailScreen() {
        if (this.failText) {
            this.failText.active = true;
        }

        if (this.darkOverlay) {
            tween(this.darkOverlay.getComponent(UIOpacity))
                .to(0.5, { opacity: 255 }) // ��������� �����
                .start();
        }

        if (this.downloadButton) {
            tween(this.downloadButton.getComponent(UIOpacity))
                .to(0.5, { opacity: 0 }) // ������������ ������ Download
                .start();
        }

        if (this.retryButton) {
            this.retryButton.active = true;
            this.retryButton.setScale(new Vec3(0, 0, 0));

            // �������� ��������� ������
            tween(this.retryButton)
                .to(0.5, { scale: new Vec3(1, 1, 1) }) // ���������� Retry ������
                .call(() => this.pulseRetryButton()) // ������ ��������� ����� ���������
                .start();
        }

    }

    pulseRetryButton() {
        tween(this.retryButton)
            .repeatForever(
                tween()
                    .to(0.5, { scale: new Vec3(1.1, 1.1, 1) }) // ����������
                    .to(0.5, { scale: new Vec3(1, 1, 1) }) // ����������� � ��������� �������
            )
            .start();
    }
}
