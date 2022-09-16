import 'styles/custome.css';

import { Auth } from './auth';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { StateProvider } from 'app/services/state/State';
import history from '@history';
import { initialState } from 'app/services/state/InitialState';
import { reducer } from 'app/services/state/Reducer';
import store from 'app/store';
import withAppProviders from './withAppProviders';

// import axios from 'axios';

/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const state = store.getState();

console.log('state', state);

const App = () => {
  return (
    <Provider store={store}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Auth>
          <Router history={history}>
            <FuseAuthorization>
              <FuseTheme>
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  classes={{
                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                  }}
                >
                  <FuseLayout />
                </SnackbarProvider>
              </FuseTheme>
            </FuseAuthorization>
          </Router>
        </Auth>
      </StateProvider>
    </Provider>
  );
};

export default withAppProviders(App)();
