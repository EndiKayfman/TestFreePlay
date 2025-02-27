import { _decorator, Component, Collider, Node, Label, tween, UIOpacity, Vec3, director, sys, ITriggerEvent, Animation, RigidBody } from 'cc';
import { TriggerManager } from './TriggerManager';

const { ccclass, property } = _decorator;

@ccclass('RoadFinish')
export class RoadFinish extends Component {

    @property(Node)
    car: Node | null = null;

    @property(Node)
    triggerManagerNode: Node | null = null; // Объект, где висит TriggerManager

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

            if (this.triggerManagerNode) {
                let manager = this.triggerManagerNode.getComponent(TriggerManager);
                if (manager) {
                    manager.makeCollidersTrigger();
                } else {
                    console.error("TriggerManager не найден на объекте triggerManager!");
                }
            } else {
                console.error("triggerManager не назначен в инспекторе!");
            }
        }

        let car = event.otherCollider.node.getComponent('CarController');
        if (car) {
            car.stopCar();
        }

        // Останавливаем следование камеры
        this.stopCameraFollow();
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

    scatterCar() {
        let children = this.car!.children; // Получаем список дочерних объектов
        this.car!.removeAllChildren(); // Отсоединяем все элементы от родителя

        children.forEach(child => {
            let rb = child.getComponent(RigidBody);
            if (!rb) {
                rb = child.addComponent(RigidBody);
            }

            // Делаем объект динамическим, чтобы на него действовала физика
            rb.mass = 1;
            rb.useGravity = true;

            // Придаем случайный импульс для разлета
            let randomDirection = new Vec3(
                (Math.random() - 0.5) * 10, // Горизонтальный разброс
                Math.random() * 5 + 5, // Подпрыгивание вверх
                (Math.random() - 0.5) * 10 // Глубина
            );

            rb.applyImpulse(randomDirection);
        });

        console.log("Машина рассыпалась!");
    }

    stopCameraFollow() {
        let cameraNode = director.getScene()?.getChildByName("Main Camera");
        if (cameraNode) {
            let cameraScript = cameraNode.getComponent("CameraFollow"); // Указываем название твоего скрипта
            if (cameraScript) {
                cameraScript.stopFollowing(); // Останавливаем следование камеры
                console.log("Камера остановлена!");
            }
        } else {
            console.error("Камера не найдена!");
        }
    }
}
