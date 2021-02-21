import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Menu from './components/Menu/Menu';
import Page from './pages/Pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { appPages } from './app-pages';
// import analytics from './firebase';

const AppInner = () => {
  const history = useHistory();
  const [state, setState] = useState();

  useEffect(() => {
    const pageName = history.location.pathname.split('/').pop();
    document.title = `Ionic ${pageName}`;
  }, [history.location]);

  return (
    <>
      <Route path="/" exact>
        <Redirect to="/page/TodoList" />
      </Route>
      {appPages.map((appPage) => {
        return (
          <Route
            key={appPage.id}
            path={appPage.url}
            exact
            component={appPage.component}
          />
        );
      })}
    </>
  );
};

const App: React.FC = () => {
  // analytics().logEvent('app initialized');

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <AppInner />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
