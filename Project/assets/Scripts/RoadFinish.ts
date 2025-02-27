import { _decorator, Component, Collider, Node, Label, tween, UIOpacity, Vec3, director, sys, ITriggerEvent, Animation, RigidBody } from 'cc';
import { TriggerManager } from './TriggerManager';

const { ccclass, property } = _decorator;

@ccclass('RoadFinish')
export class RoadFinish extends Component {

    @property(Node)
    car: Node | null = null;

    @property(Node)
    triggerManagerNode: Node | null = null; // ������, ��� ����� TriggerManager

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

            if (this.triggerManagerNode) {
                let manager = this.triggerManagerNode.getComponent(TriggerManager);
                if (manager) {
                    manager.makeCollidersTrigger();
                } else {
                    console.error("TriggerManager �� ������ �� ������� triggerManager!");
                }
            } else {
                console.error("triggerManager �� �������� � ����������!");
            }
        }

        let car = event.otherCollider.node.getComponent('CarController');
        if (car) {
            car.stopCar();
        }

        // ������������� ���������� ������
        this.stopCameraFollow();
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

    scatterCar() {
        let children = this.car!.children; // �������� ������ �������� ��������
        this.car!.removeAllChildren(); // ����������� ��� �������� �� ��������

        children.forEach(child => {
            let rb = child.getComponent(RigidBody);
            if (!rb) {
                rb = child.addComponent(RigidBody);
            }

            // ������ ������ ������������, ����� �� ���� ����������� ������
            rb.mass = 1;
            rb.useGravity = true;

            // ������� ��������� ������� ��� �������
            let randomDirection = new Vec3(
                (Math.random() - 0.5) * 10, // �������������� �������
                Math.random() * 5 + 5, // ������������� �����
                (Math.random() - 0.5) * 10 // �������
            );

            rb.applyImpulse(randomDirection);
        });

        console.log("������ �����������!");
    }

    stopCameraFollow() {
        let cameraNode = director.getScene()?.getChildByName("Main Camera");
        if (cameraNode) {
            let cameraScript = cameraNode.getComponent("CameraFollow"); // ��������� �������� ������ �������
            if (cameraScript) {
                cameraScript.stopFollowing(); // ������������� ���������� ������
                console.log("������ �����������!");
            }
        } else {
            console.error("������ �� �������!");
        }
    }
}
