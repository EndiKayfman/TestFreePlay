import { _decorator, Component, ITriggerEvent, Collider } from 'cc';
import { BridgePiece } from './BridgePiece';
const { ccclass, property } = _decorator;

@ccclass('WheelSensor')
export class WheelSensor extends Component {
    // Имя группы или проверка по тегу/имени для мостовых частей
    @property
    bridgeTag: string = "BridgePiece";

    onTriggerEnter(event: ITriggerEvent) {
        const otherNode = event.otherCollider.node;
        if (otherNode.group === this.bridgeTag) {
            // Здесь можно, например, получить BridgePiece и вызвать activateFall()
            const bridgePiece = otherNode.getComponent('BridgePiece');
            if (bridgePiece && typeof bridgePiece.fall === 'function') {
                bridgePiece.fall();
            }
        }
    }
}
