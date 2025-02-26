import {
    _decorator,
    Component,
    RigidBody,
    ERigidBodyType,
    Collider,
    ICollisionEvent,
    SphereCollider,
    BoxCollider
} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('BridgePiece')
export class BridgePiece extends Component {
    @property
    fallDelay: number = 1.0; // �������� ����� ��������

    private rigidBody: RigidBody | null = null;
    private hasFallen = false;

    start() {
        this.rigidBody = this.getComponent(RigidBody);
        if (this.rigidBody) {
            // ���������� ������ ����� �������������� � ��� ����������
            this.rigidBody.type = ERigidBodyType.KINEMATIC;
            this.rigidBody.useGravity = false;
        }

        // ������������� �� ������� ������������
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onCollisionEnter', this.onCollisionEnter, this);
        }
    }

    onCollisionEnter(event: ICollisionEvent) {
        // ���������, ��� ����������� ������ �� ����������� �����������
        const other = event.otherCollider as Collider;
        if (!this.hasFallen && other.getComponent(BoxCollider)) {
            this.hasFallen = true;
            this.scheduleOnce(() => this.fall(), this.fallDelay);
        }
    }

    private fall() {
        if (this.rigidBody) {
            this.rigidBody.type = ERigidBodyType.DYNAMIC;
            this.rigidBody.useGravity = true;
        }
    }
}
