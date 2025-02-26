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
            console.log('Триггер зарегистрирован');
        } else {
            console.error('Коллайдер не найден на объекте RoadFinish');
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        console.log(`Объект ${event.otherCollider.node.name} коснулся финиша`);

        // Проверяем, что столкнулась именно машина
        if (event.otherCollider.node.name === "Car") {
            console.log("Машина достигла финиша!");

            // Если у машины есть анимация — запускаем
            if (this.carAnimation) {
                this.carAnimation.play();
                console.log("Анимация запущена!");
            } else {
                console.warn("Анимация не найдена!");
            }
        }
    }
}
