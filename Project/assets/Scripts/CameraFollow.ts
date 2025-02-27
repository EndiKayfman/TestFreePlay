import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target: Node = null; // Машина

    @property
    followSpeed: number = 5; // Начальная скорость следования

    private offset: Vec3 = new Vec3();
    private isFollowing: boolean = true; // Флаг, следим ли за машиной
    private stopSpeed: number = 1; // Скорость остановки камеры
    private initialY: number = 0; // Начальная высота камеры

    onLoad() {
        if (this.target) {
            this.offset = this.node.position.clone().subtract(this.target.position);
            this.initialY = this.node.position.y; // Сохраняем начальное значение оси Y
        }
    }

    update(deltaTime: number) {
        if (!this.target) return;

        let targetPos = this.target.position.clone().add(this.offset);
        let currentPos = this.node.position.clone();

        // Плавное движение камеры (Lerp)
        let newPos = currentPos.lerp(targetPos, deltaTime * this.followSpeed);

        // Блокируем ось Y (камера не будет двигаться по вертикали)
        newPos.y = this.initialY; // Камера всегда остается на том же уровне Y

        // Если камера остановлена, замедляем её движение
        if (!this.isFollowing) {
            this.followSpeed = Math.max(0, this.followSpeed - deltaTime * this.stopSpeed); // Замедление камеры
        }

        this.node.setPosition(newPos);
    }

    // Метод для остановки следования
    stopFollowing() {
        this.isFollowing = false;
    }

    // Метод для возобновления следования
    startFollowing() {
        this.isFollowing = true;
        this.followSpeed = 5; // Возвращаем начальную скорость
    }
}
