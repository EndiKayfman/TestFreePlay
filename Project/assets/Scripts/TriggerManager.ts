import { _decorator, Component, Collider, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TriggerManager')
export class TriggerManager extends Component {
    @property([Node])
    objects: Node[] = [];

    makeCollidersTrigger() {
        if (!this.objects || this.objects.length === 0) {
            console.error("������ �������� ���� ��� �� �����!");
            return;
        }

        this.objects.forEach(obj => {
            if (!obj) {
                console.error("���� �� �������� � ������ �������� null!");
                return;
            }

            let collider = obj.getComponent(Collider);
            if (collider) {
                collider.isTrigger = true;
                console.log(`��������� � ${obj.name} ���� ����������.`);
            } else {
                console.error(`��������� �� ������ � �������: ${obj.name}`);
            }
        });
    }
}
