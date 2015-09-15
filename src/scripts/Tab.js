class Tab {

    constructor (tabs, toggle, tab) {
        this.tabs = tabs;
        this.toggle = toggle;
        this.tab = tab;
        this.init();
    }

    init () {

        if (this.toggle.classList.contains('active')) {
            this.open();
        } else {
            this.close();
        }

        this.toggle.addEventListener('click', () => {
            this.open();
        });
    }

    open () {
        if (this.tabs.active === this) {
            return;
        }
        if (this.tabs.active) {
            this.tabs.active.close();
        }
        this.tabs.active = this;
        this.tab.style.display = 'block';
        this.toggle.classList.add('active');
    }

    close () {
        this.tab.style.display = 'none';
        this.toggle.classList.remove('active');
    }

}

export {Tab}