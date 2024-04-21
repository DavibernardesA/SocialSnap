export const envChecker = (v: string | undefined): string =>
  v
    ? v
    : (() => {
        throw new Error(`the variable ${v} is not defined`);
      })();
