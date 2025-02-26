import { _decorator, Component, sys } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('DownloadButton')
export class DownloadButton extends Component {
    @property
    androidUrl: string = 'https://play.google.com/store/games';

    @property
    iosUrl: string = 'https://apps.apple.com/ru/charts/iphone';

    openStore() {
        if (sys.os === sys.OS.ANDROID) {
            window.open(this.androidUrl, '_blank');
        } else if (sys.os === sys.OS.IOS) {
            window.open(this.iosUrl, '_blank');
        } else {
            console.log('Unknown OS, no store redirection');
        }
    }
}
