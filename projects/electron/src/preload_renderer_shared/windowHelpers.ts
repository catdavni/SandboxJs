export const getRendererToMainApi = <T>(apiName: string): T => {
  const api = (window as any)[apiName];
  if (!api) {
    throw new Error('Application API is not available');
  }
  return api;
};
