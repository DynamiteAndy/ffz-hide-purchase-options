import { PubSubType } from '@hpo-types';

type Events = {
  'styles:reapply': null;
};

function PubSub<E>(): PubSubType<E> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlers: { [key: string]: any[] } = {};

  return {
    publish: (event, msg) => {
      (handlers[event] ?? []).forEach((h) => h(msg));
    },

    subscribe: (event, callback) => {
      const list = handlers[event] ?? [];
      list.push(callback);
      handlers[event] = list;

      return callback;
    },

    unsubscribe: (event, callback) => {
      let list = handlers[event] ?? [];
      list = list.filter((h) => h !== callback);
      handlers[event] = list;
    }
  };
}

export default PubSub<Events>();
