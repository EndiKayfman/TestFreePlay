import { _decorator, Component, Node, Collider, Vec3, tween, Label, find, UITransform, Quat } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {
    @property(Node)
    coinUI!: Node; // UI-иконка монеты в Canvas

    private static coinCount: number = 0; // Общий счётчик монет
    private targetPos: Vec3 = new Vec3(); // Позиция UI-иконки
    private rotationSpeed: number = 200; // Скорость вращения

    start() {
        // Обработчик триггера
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onCollect, this);
        }

        // Определяем мировую позицию UI-иконки
        const canvas = find('Canvas');
        if (canvas && this.coinUI) {
            const uiTransform = this.coinUI.getComponent(UITransform);
            if (uiTransform) {
                this.targetPos = this.coinUI.worldPosition.clone();
            }
        }
    }

    update(deltaTime: number) {
        // Вращение монеты
        const rotation = this.node.rotation;
        const newRotation = new Quat();
        Quat.rotateY(newRotation, rotation, this.rotationSpeed * deltaTime * (Math.PI / 180));
        this.node.setRotation(newRotation);
    }

    onCollect(event: any) {
        // Проверяем, что машина касается монеты
        if (event.otherCollider.node.name === 'Car') {
            this.incrementCoinCount(); // Обновляем счётчик сразу
            this.animateToUI();
        }
    }

    animateToUI() {
        // Отключаем коллайдер
        this.getComponent(Collider)!.enabled = false;

        // Анимация: летим быстрее
        tween(this.node)
            .to(0.7, { worldPosition: this.targetPos }, { easing: 'quadInOut' }) // Было 1.5 → стало 0.7
            .call(() => {
                this.node.destroy(); // Удаляем монету
            })
            .start();
    }

    incrementCoinCount() {
        Coin.coinCount += 1; // Увеличиваем счётчик
        this.updateUI();
    }

    updateUI() {
        // Ищем Label счётчика и обновляем текст
        const coinLabel = find('Canvas/Coins/CoinCounter/')?.getComponent(Label);
        if (coinLabel) {
            coinLabel.string = `${Coin.coinCount}`;
        } else {
            console.warn("Не найден Label для счётчика монет!");
        }
    }
}
