import {SettingsValues} from './SettingsValues';

class Gallery {

  constructor(container) {
    this.container = container;
    this.init();
    this.load();
  }

  init() {
    this.settings= new SettingsValues();
    this.model = {
      baseURL: '//lorempixel.com',
      id: 0,
      category: 'sports'
    }
    this.liked = [];

    this.$category = this.container.querySelector('select.category');
    this.$favorites = this.container.querySelector('select.favorites');
    this.$image = this.container.querySelector('.preview');

    this.$prev = this.container.querySelector('.action.prev');
    this.$next = this.container.querySelector('.action.next');
    this.$like = this.container.querySelector('.action.like');

    this.$category.addEventListener('change', this.setCategory.bind(this));

    this.$prev.addEventListener('click', () => this.model.id--);
    this.$next.addEventListener('click', () => this.model.id++);
    this.$like.addEventListener('click', this.like.bind(this));

    Object.observe(this.model, this.load.bind(this));
    Object.observe(this.settings, this.load.bind(this));

  }

  get url() {
    return `${this.model.baseURL}/${this.settings.width}/${this.settings.height}/${this.model.category}/${this.model.id}`;
  }

  load() {
    console.log('`url($this.url)` ' , `url(${this.url})`);
    this.$image.style.backgroundImage = `url(${this.url})`;
    this.$image.style.height = `${this.settings.height}px`;
    this.$prev.style.display = this.model.id === 0 ? 'none' : 'block';
  }

  setCategory() {
    this.model.id = 0;
    this.model.category = this.$category.value;
  }

  like() {
    this.liked.push(this.url);
  }

}

export {
  Gallery
}
