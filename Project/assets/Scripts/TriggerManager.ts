import { _decorator, Component, Collider, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TriggerManager')
export class TriggerManager extends Component {
    @property([Node])
    objects: Node[] = [];

    makeCollidersTrigger() {
        if (!this.objects || this.objects.length === 0) {
            console.error("Список объектов пуст или не задан!");
            return;
        }

        this.objects.forEach(obj => {
            if (!obj) {
                console.error("Один из объектов в списке оказался null!");
                return;
            }

            let collider = obj.getComponent(Collider);
            if (collider) {
                collider.isTrigger = true;
                console.log(`Коллайдер у ${obj.name} стал триггерным.`);
            } else {
                console.error(`Коллайдер не найден у объекта: ${obj.name}`);
            }
        });
    }
}
