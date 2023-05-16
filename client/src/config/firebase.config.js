import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBZPm3r8qfKNKWO3nlXERQyMRzVyDsEOqk",
//   authDomain: "food-ordering-app-f2075.firebaseapp.com",
//   projectId: "food-ordering-app-f2075",
//   storageBucket: "food-ordering-app-f2075.appspot.com",
//   messagingSenderId: "135972992316",
//   appId: "1:135972992316:web:2d2a98c603544820381a39",
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
