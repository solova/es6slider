import config from "../../config"

let instance = null;

class SettingsValues {
  constructor() {

    if (!instance) {
      instance = this;
      this._width = config.defaultWidth;
      this._height = config.defaultHeight;
    }

    return instance;

  }
  get width() {
    return this._width;
  }

  set width(newWidth) {
    if (newWidth) {
      this._width = newWidth;
    }
  }

  get height() {
    return this._height;
  }

  set height(newHeight) {
    if (newHeight) {
      this._height = newHeight;
    }
  }
}

export {
  SettingsValues
}
