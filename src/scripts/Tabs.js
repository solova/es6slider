import { Tab } from './Tab';

class Tabs {
    constructor (container) {
        this.container = container;
        this.init();
    }
    init () {
        this.captions = this.container.querySelectorAll('.tab-caption');
        this.tabs = this.container.querySelectorAll('.tab');
        if (!this.isEverythingOk()) {
            return;
        }

        for (let index = 0; index < this.captions.length; index++) {
            new Tab (this, this.captions[index], this.tabs[index]);
        }
    }
    isEverythingOk () {
        if (this.captions.length !== this.tabs.length) {
            console.warn('Tabs captions and tabs amounts are not matching');
            return false;
        } else if (this.captions.length === 0) {
            console.warn('There\'s no captions for tabs');
            return false;
        } else if (this.tabs.length === 0) {
            console.warn('There\'s no content tabs');
            return false;
        }
        return true;
    }
}

export {Tabs}