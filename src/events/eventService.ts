type Callback = (event: string) => void;
type Notifiable = (event: string) => boolean;

class Subscriber {
  callback: Callback;
  shouldBeNotified: Notifiable;

  constructor(callback: Callback, shouldBeNotified: Notifiable) {
    this.callback = callback;
    this.shouldBeNotified = shouldBeNotified;
  }
}

export class EventService {
  subscribers: Subscriber[] = [];

  addSubscriber(callback: Callback, filter: Notifiable) {
    if (this.subscribers.findIndex(subs => subs.callback === callback) === -1) {
      this.subscribers.push(new Subscriber(callback, filter));
    }
  }

  listen(callback: Callback) {
    this.addSubscriber(callback, () => true);
  }

  unlisten(callback: Callback) {
    this.subscribers = this.subscribers.filter(
      subs => subs.callback !== callback
    );
  }

  event(event: string) {
    this.subscribers
      .filter(subs => subs.shouldBeNotified(event))
      .forEach(subs => subs.callback(event));
  }

  clean() {
    this.subscribers = [];
  }
}

export const EVENT_SERVICE = new EventService();
