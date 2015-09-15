import {SettingsValues} from "./SettingsValues"


class Settings {
  constructor(container) {
  console.log('container ' , container);

    this.container = container;
    this.init();

  }
  init() {

    this.$width = this.container.querySelector('input[name="width"]');
    this.$height = this.container.querySelector('input[name="height"]');

    this.$width.value = (new SettingsValues).width;
    this.$height.value = (new SettingsValues).height;
    console.log('this.$height.value ', this.$height.value);

    this.$width.addEventListener('change', () => {
      console.log('change width', this.$width.value);
      this.$width.value = Math.max(this.$width.value, 0);
      this.$width.value = Math.min(this.$width.value, 1920);
      (new SettingsValues).width = this.$width.value;
    });

    this.$height.addEventListener('change', () => {
      console.log('change height', this.$height.value);
      this.$height.value = Math.max(this.$height.value, 0);
      this.$height.value = Math.min(this.$height.value, 1920);
      (new SettingsValues).height = this.$height.value;
    });
  }

}

export {
  Settings
}
