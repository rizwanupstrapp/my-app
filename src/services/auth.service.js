import ApiService from "./api.service";

const AuthService = {
  async login(data) {
    return await ApiService.post("/login", data);
  },
  async signUp(data) {
    return await ApiService.post("/signup", data);
  },
  async forgotPassword(data) {
    return await ApiService.post("/forgot-password", data);
  },
  async resetPassword(data) {
    return await ApiService.post("/reset-password", data);
  },
  async changePassword(data) {
    return await ApiService.post("/change-password", data);
  },
  async checkResetPasswordToken(data) {
    return await ApiService.post("/check-reset-password-token", data);
  },
  async getProfile() {
    return await ApiService.get("/user-profile");
  },
  async viewProfile() {
    return await ApiService.get("/profile");
  },
  async updateProfile(data) {
    return await ApiService.post("/profile", data);
  },
  async registration(data) {
    return await ApiService.post("/members", data);
  },
};

export default AuthService;
