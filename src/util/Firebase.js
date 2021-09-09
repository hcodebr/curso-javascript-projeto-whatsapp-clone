// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export class Firebase{
  constructor(){
    this._config = {
      // firebase settings
    }
    this.init();
  }

  init(){
    // Initialize Firebase

    if(!this._initialized){

      const firebaseApp = firebase.initializeApp(this._config);
      
      this._initialized = true;

    }
  }

  static db(){
     return firebase.firestore();
  }

  static hd(){
    return firebase.storage();
  }

  initAuth(){
    // Autenticação por email

    return new Promise((s,f) => {

      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(result => {

        let token = result.credential.accessToken;
        let user = result.user;

        s(user,token);

      }).catch(err=>{

        f(err);

      });


    })
  }

}

