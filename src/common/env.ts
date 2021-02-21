import { APP_ERROR_NAMES, MyCustomError } from './app-errors';

const ENV_PREFIX = 'REACT_APP_' as const;

export const PROCESS_ENV_PARAMS_KEYS = {
  MODE: `${ENV_PREFIX}MODE`,
  API_ENDOPOINT: `${ENV_PREFIX}API_ENDPOINT`,
} as const;

type ProcessEnvParamsKeys = typeof PROCESS_ENV_PARAMS_KEYS[keyof typeof PROCESS_ENV_PARAMS_KEYS];

export const getProcessEnvParam = (key: ProcessEnvParamsKeys): string => {
  if (process.env[key] !== undefined) {
    return process.env[key] as string;
  }

  throw new MyCustomError(
    APP_ERROR_NAMES.UNKNOWN,
    `failed get process.env.${key}`
  );
};
