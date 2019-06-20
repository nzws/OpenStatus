import firebase from 'firebase/app';
import 'firebase/firestore';

export const ConnectFireStore = () => {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    projectId: process.env.FIREBASE_PROJECT_ID
  });

  return firebase.firestore();
};

export const GetData = db => {
  return new Promise((resolve, reject) => {
    db.collection('statuses')
      .get()
      .then(query => {
        const newdata = [];

        query.forEach(status => {
          const data = status.data();

          newdata.push({
            name: status.id,
            status: data.status,
            updated_at: data.updated_at.toDate()
          });
        });

        resolve(newdata);
      });
  });
};

export const FireStoreActions = {
  update: statuses => state => {
    return {
      statuses
    };
  }
};
