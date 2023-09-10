export {};

declare global {
  interface Window {
    ffz: {
      on: (event: string, fn: unknown) => void;
      addons: {
        loaded: boolean;
        settings: {
          add: (key: string, definition: unknown) => void;
          addUI: (key: string, definition: unknown) => void;
          getChanges: (key: string, fn: unknown) => void;
        };
      };
      site: {
        elemental: {
          _observer: MutationObserver;
        };
      };
    };
  }
}
