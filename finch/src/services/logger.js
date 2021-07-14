import config from '../../config/index.js';

export function logInfo(msg, context = {}) {
  /* eslint-disable-next-line no-console */
  console.log(formatLog({
    type: 'info',
    msg,
    context,
  }));
}

export function logError(msg, context = {}) {
  /* eslint-disable-next-line no-console */
  console.error(formatLog({
    type: 'error',
    msg,
    context,
  }));
}

export function logWarning(msg, context = {}) {
  /* eslint-disable-next-line no-console */
  console.warn(formatLog({
    type: 'warning',
    msg,
    context,
  }));
}

export function formatLog(logContents) {
  return config.logs.prettify ? logContents : JSON.stringify(logContents);
}
