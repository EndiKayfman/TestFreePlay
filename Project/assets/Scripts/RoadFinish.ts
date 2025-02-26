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

            this.scheduleOnce(() => {
                this.showFailScreen();
            }, 1.5); // Задержка 1.5 секунды перед появлением "FAIL"
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
                .to(0.5, { opacity: 255 }) // Затемняем экран
                .start();
        }

        if (this.downloadButton) {
            tween(this.downloadButton.getComponent(UIOpacity))
                .to(0.5, { opacity: 0 }) // Исчезновение кнопки Download
                .start();
        }

        if (this.retryButton) {
            this.retryButton.active = true;
            this.retryButton.setScale(new Vec3(0, 0, 0));

            // Анимация появления кнопки
            tween(this.retryButton)
                .to(0.5, { scale: new Vec3(1, 1, 1) }) // Увеличение Retry кнопки
                .call(() => this.pulseRetryButton()) // Запуск пульсации после появления
                .start();
        }

    }

    pulseRetryButton() {
        tween(this.retryButton)
            .repeatForever(
                tween()
                    .to(0.5, { scale: new Vec3(1.1, 1.1, 1) }) // Увеличение
                    .to(0.5, { scale: new Vec3(1, 1, 1) }) // Возвращение к исходному размеру
            )
            .start();
    }
}
