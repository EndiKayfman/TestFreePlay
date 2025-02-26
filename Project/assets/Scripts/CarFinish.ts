import { _decorator, Component, Collider, ITriggerEvent, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoadFinish')
export class RoadFinish extends Component {

    @property(Animation)
    carAnimation: Animation | null = null;

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
        }
    }
}
