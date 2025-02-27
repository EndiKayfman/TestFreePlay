import { _decorator, Component, Node, EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LeverControl')
export class LeverControl extends Component {
    @property(Node)
    car: Node = null; // —сылка на машину

    private initialY: number = 0;
    private minY: number = -52;
    private maxY: number = 52;

    onLoad() {
        this.initialY = this.node.position.y;
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        let delta = event.getDelta();
        let newY = this.node.position.y + delta.y;

        newY = Math.min(this.initialY + this.maxY, Math.max(this.initialY + this.minY, newY));

        this.node.setPosition(this.node.position.x, newY, this.node.position.z);

        let acceleration = (newY - this.initialY) / this.maxY;
        this.car.getComponent('CarController')?.setAcceleration(acceleration);
    }
}
