export const envChecker = (v: string | undefined): string =>
  v
    ? v
    : (() => {
        throw new Error('');
      })();
