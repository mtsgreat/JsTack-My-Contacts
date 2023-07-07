export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  emit(event, payload) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);

    this.listeners.set(event, filteredListeners);
  }
}

// const toastManager = new EventManager();

// function addToast1(payload) {
//   console.log('addtoast executou 1', payload);
// }

// function addToast2(payload) {
//   console.log('addtoast executou 2', payload);
// }
// toastManager.on('addtoast', addToast1);
// toastManager.on('addtoast', addToast2);

// toastManager.emit('addtoast', { type: 'danger', text: 'TEXTO' });

// toastManager.removeListener('addtoast', addToast1);

// toastManager.emit('addtoast', 'depois de remover..');
// console.log(toastManager);
