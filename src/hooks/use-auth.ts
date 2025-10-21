export const useAuth = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  return { token, isLoggedIn };
};
