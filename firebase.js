import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyATL3C7Q-tpKCLuTqiikHgKXS6rYuzjU9U",
  authDomain: "mojxml2geojson.firebaseapp.com",
  projectId: "mojxml2geojson",
  storageBucket: "mojxml2geojson.appspot.com",
  messagingSenderId: "319231052568",
  appId: "1:319231052568:web:9c73d6cb613d7e8b64ec6d",
  measurementId: "G-EP73VQ7HDJ"
};

export{ app}
const app = initializeApp(firebaseConfig);
getAnalytics(app);