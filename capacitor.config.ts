import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'shopping_list_deluxe',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: "976748346554-7palasrs6s8u35f3p22jlqqob3de8vov.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
