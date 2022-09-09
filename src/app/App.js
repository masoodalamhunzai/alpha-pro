import 'styles/custome.css';

import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { StateProvider } from 'app/services/state/State';
import history from '@history';
import { initialState } from 'app/services/state/InitialState';
import { reducer } from 'app/services/state/Reducer';
import { Auth } from './auth';
import withAppProviders from './withAppProviders';

// import axios from 'axios';

/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const App = () => {
  return (
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
  );
};

export default withAppProviders(App)();
