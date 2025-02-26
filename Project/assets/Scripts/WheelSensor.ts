import { _decorator, Component, ITriggerEvent, Collider } from 'cc';
import { BridgePiece } from './BridgePiece';
const { ccclass, property } = _decorator;

@ccclass('WheelSensor')
export class WheelSensor extends Component {
    // ��� ������ ��� �������� �� ����/����� ��� �������� ������
    @property
    bridgeTag: string = "BridgePiece";

    onTriggerEnter(event: ITriggerEvent) {
        const otherNode = event.otherCollider.node;
        if (otherNode.group === this.bridgeTag) {
            // ����� �����, ��������, �������� BridgePiece � ������� activateFall()
            const bridgePiece = otherNode.getComponent('BridgePiece');
            if (bridgePiece && typeof bridgePiece.fall === 'function') {
                bridgePiece.fall();
            }
        }
    }
}
