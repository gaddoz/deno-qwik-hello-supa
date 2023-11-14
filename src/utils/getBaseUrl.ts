export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    // browser should use relative url
    return "";
  }
  // dev SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 5173}`;
};
