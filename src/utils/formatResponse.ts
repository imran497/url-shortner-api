export const formatResponse = (data: any, statusCode: number = 200, extraData: any = {}) => {
  return {
    statusCode,
    data,
    ...extraData,
  };
};