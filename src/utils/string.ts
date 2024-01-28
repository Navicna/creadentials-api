export const removeBearerToken = (tokenString: string): string => {
  if (tokenString.startsWith("Bearer ")) {
    return tokenString.slice(7);
  }
  return tokenString;
};
