import { app, h } from 'hyperapp';
import dotenv from 'dotenv';
import '../scss/index.scss';
import { Statuses } from './components/statuses';
import { Twitter } from './components/twitter';
import { Footer } from './components/footer';
import {
  ConnectFireStore,
  GetData,
  FireStoreActions
} from './components/firestore';

dotenv.config();

window.onload = () => {
  const state = {
    twitterAccount: process.env.TWITTER_ID || 'TwitterDev',
    firestore: {
      statuses: []
    }
  };

  const actions = {
    firestore: FireStoreActions
  };

  const view = (state, actions) => (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Statuses state={state.firestore} />
        </div>
        <div className="col-lg-4">
          <Twitter state={state} />
        </div>
      </div>

      <Footer />
    </div>
  );

  const App = app(state, actions, view, document.body);

  const db = ConnectFireStore();
  GetData(db).then(data => App.firestore.update(data));
};
