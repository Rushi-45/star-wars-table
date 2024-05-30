export const authService = {
  isAuthenticated: sessionStorage.getItem("isAuthenticated") === "true",

  login(username: string, password: string): boolean {
    if (username === "rushi45" && password === "abcd@1234") {
      this.isAuthenticated = true;
      sessionStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  },

  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.removeItem("isAuthenticated");
  },

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  },
};

export default authService;
