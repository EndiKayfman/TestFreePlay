import { _decorator, Component, Node, Vec3, tween, Button, EventHandler, EventMouse } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('FloatingImageUI')
export class FloatingImageUI extends Component {
    @property(Node)
    imageNode: Node = null; // Объект с картинкой

    @property(Node)
    buttonNode: Node = null; // Кнопка для прекращения появления картинки

    @property
    moveDistance: number = 50; // Расстояние вверх/вниз

    @property
    moveDuration: number = 1; // Длительность анимации движения

    @property
    showInterval: number = 2; // Интервал появления картинки

    private isImageVisible: boolean = false; // Флаг, показывается ли картинка
    private stopShowing: boolean = false; // Флаг, чтобы остановить дальнейшее появление

    onLoad() {
        // Устанавливаем начальное состояние изображения (оно скрыто)
        if (this.imageNode) {
            this.imageNode.active = false;
        }

        // Назначаем обработчик на кнопку
        if (this.buttonNode) {
            this.buttonNode.on(Node.EventType.MOUSE_DOWN, this.onStopImageAppearance, this);  // Используем onMouseDown
        }

        // Запускаем таймер на появления картинки
        this.schedule(this.toggleImage, this.showInterval, Infinity);

        // Начинаем анимацию сразу при старте
        this.showImage();
    }

    // Метод для появления картинки
    toggleImage() {
        if (this.stopShowing) return; // Если флаг остановки установлен, выходим из метода

        this.showImage();
    }

    // Метод для показа картинки
    showImage() {
        if (!this.imageNode || this.isImageVisible) return;

        this.isImageVisible = true;
        this.imageNode.active = true;

        // Сохраняем начальную позицию картинки
        const initialPos = this.imageNode.position.clone();

        // Анимация движения картинки вверх/вниз по оси Y
        tween(this.imageNode)
            .to(this.moveDuration, { position: new Vec3(initialPos.x, initialPos.y + this.moveDistance, initialPos.z) }) // Двигаем вверх
            .to(this.moveDuration, { position: new Vec3(initialPos.x, initialPos.y - this.moveDistance, initialPos.z) }) // Двигаем вниз
            .to(this.moveDuration, { position: initialPos }) // Возвращаем в исходное положение
            .call(() => {
                // Завершаем анимацию, скрываем картинку
                this.imageNode.active = false;
                this.isImageVisible = false;
            })
            .start();
    }

    // Метод для остановки появления картинки (по нажатию на кнопку)
    onStopImageAppearance(event: EventMouse) {
        // Если уже остановлено — ничего не делаем
        if (this.stopShowing) return;

        // Останавливаем показ картинки
        this.stopShowing = true;
        this.imageNode.active = false; // Немедленно скрыть картинку

        // Останавливаем таймер, чтобы больше не вызывался toggleImage
        this.unschedule(this.toggleImage);

        console.log("Появление картинки остановлено.");
    }
}
