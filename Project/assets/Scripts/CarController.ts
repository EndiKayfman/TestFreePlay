import { _decorator, Component, Node, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CarController')
export class CarController extends Component {
    @property(Node)
    frontLeftWheel: Node = null;

    @property(Node)
    frontRightWheel: Node = null;

    @property(Node)
    rearLeftWheel: Node = null;

    @property(Node)
    rearRightWheel: Node = null;

    @property
    wheelRadius: number = 0.5;

    private speed: number = 0;
    private acceleration: number = 0;
    private maxSpeed: number = 30;
    private wheelRotation: number = 0;
    private baseRotation: Quat = new Quat();
    private isStopping: boolean = false;
    private deceleration: number = 7; // Скорость замедления

    onLoad() {
        if (this.frontLeftWheel) this.baseRotation.set(this.frontLeftWheel.rotation);
    }

    update(deltaTime: number) {
        if (this.isStopping) {
            this.speed -= this.deceleration * deltaTime;
            if (this.speed <= 0) {
                this.speed = 0;
            }
        } else {
            this.speed += this.acceleration * 3 * deltaTime;
        }

        this.speed = Math.max(0, Math.min(this.maxSpeed, this.speed));

        let pos = this.node.position;
        this.node.setPosition(pos.x + this.speed * deltaTime, pos.y, pos.z);

        this.rotateWheels(deltaTime);
    }

    rotateWheels(deltaTime: number) {
        if (this.wheelRadius <= 0) return;

        let wheelCircumference = 2 * Math.PI * this.wheelRadius;
        let rotationAngle = (this.speed / wheelCircumference) * 360 * deltaTime;

        this.wheelRotation += rotationAngle;

        let wheelQuat = new Quat();
        Quat.fromEuler(wheelQuat, 0, this.wheelRotation, 0);

        let finalRotation = new Quat();
        Quat.multiply(finalRotation, this.baseRotation, wheelQuat);

        if (this.frontLeftWheel) this.frontLeftWheel.setRotation(finalRotation);
        if (this.frontRightWheel) this.frontRightWheel.setRotation(finalRotation);
        if (this.rearLeftWheel) this.rearLeftWheel.setRotation(finalRotation);
        if (this.rearRightWheel) this.rearRightWheel.setRotation(finalRotation);
    }

    setAcceleration(value: number) {
        this.acceleration = value * 5;
    }

    stopCar() {
        this.isStopping = true;
    }
}
