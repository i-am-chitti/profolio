import * as firebase from "firebase/app";
import "firebase/auth";

const checkLogIn = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var email = user.email;
          console.log(email+" user is signed in");
          return 1;
        } else {
            console.log("no user");
            return 0;
        }
      });      
}

export default checkLogIn;