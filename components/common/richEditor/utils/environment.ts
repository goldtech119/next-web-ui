export const CAN_USE_DOM
  = typeof window !== 'undefined'
  && typeof window.document !== 'undefined'
  && typeof window.document.createElement !== 'undefined';

export const IS_APPLE
  = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

export const IS_FIREFOX
  = CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);

export const IS_SAFARI
  = CAN_USE_DOM && /Version\/[\d.].*Safari/.test(navigator.userAgent);

export const IS_IOS
  = CAN_USE_DOM && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const IS_WINDOWS = CAN_USE_DOM && /Win/.test(navigator.userAgent);

export const IS_CHROME
  = CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent);

export const IS_APPLE_WEBKIT
  = CAN_USE_DOM && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && !IS_CHROME;
