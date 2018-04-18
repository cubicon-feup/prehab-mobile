import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-prehab-key";
export const API_TOKEN = "auth-prehab-api-token";
export const PREHAB_ID = "auth-prehab-id";

export const onRegisterPassword = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignIn = (apiToken, prehabId) => AsyncStorage.multiSet([
  [USER_KEY, "true"],
  [API_TOKEN, apiToken],
  [PREHAB_ID, prehabId]
]);

export const onSignOut = () => AsyncStorage.multiRemove(
  [USER_KEY, API_TOKEN, PREHAB_ID],
  (err) => {
    ('Local storage user info removed!');
  }
);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};