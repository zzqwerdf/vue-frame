import Vue from 'vue';
import WxDialog from './dialog';

let instance;

const initInstance = () => {
  instance = new (Vue.extend(WxDialog))({
    el: document.createElement('div')
  });

  instance.$on('input', value => {
    instance.value = value;
  });

  document.body.appendChild(instance.$el);
};

const Dialog = options => {
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }

    Object.assign(instance, {
      resolve,
      reject,
      ...options
    });
  });
};

Dialog.defaultOptions = {
  value: true,
  title: '',
  message: '',
  overlay: true,
  lockScroll: true,
  beforeClose: null,
  confirmButtonText: '',
  cancelButtonText: '',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  callback: action => {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action);
  }
};

Dialog.alert = options => Dialog({
  ...Dialog.currentOptions,
  ...options
});

Dialog.confirm = options => Dialog({
  ...Dialog.currentOptions,
  showCancelButton: true,
  ...options
});

Dialog.close = () => {
  if (instance) {
    instance.value = false;
  }
};

Dialog.setDefaultOptions = options => {
  Object.assign(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = { ...Dialog.defaultOptions };
};

Dialog.install = () => {
  Vue.use(WxDialog);
};

Vue.prototype.$dialog = Dialog;
Dialog.resetDefaultOptions();

export default Dialog;
