export const APP_ERROR_NAMES = {
  UNKNOWN: 'ERR_CODE_01',
  TIMEOUT: 'ERR_CODE_02',
  NETWORK: 'ERR_CODE_03',
} as const;

export type AppErrorNames = typeof APP_ERROR_NAMES[keyof typeof APP_ERROR_NAMES];

export class MyCustomError extends Error {
  constructor(public customError: AppErrorNames, e?: string) {
    super(e);

    // for ES3 ES5
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
