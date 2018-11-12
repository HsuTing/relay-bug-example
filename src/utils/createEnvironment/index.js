/* global __IS_SERVER__ */
/* eslint-disable global-require */
export const { initEnvironment, createEnvironment } = (__IS_SERVER__
  ? require('./server')
  : require('./client')
).default;
