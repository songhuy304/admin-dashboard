export const COMMON_PATH = {
  CREATE: 'create',
  EDIT: 'edit',
};

const ADS_PATH = 'ads';
export const ADS_ROUTE = {
  BASE: ADS_PATH,
  EDIT: (id: number | string) => `${ADS_PATH}/edit/${id}`,
  LIST: `${ADS_PATH}/list`,
};
