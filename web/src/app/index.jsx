import { LoginPage, ReportPage } from '@Pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import './style.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={routes.REPORT_PAGE}>
            <ReportPage />
          </Route>
          <Route path={routes.HOME_PAGE}>
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
