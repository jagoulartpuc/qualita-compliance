import {
  LoginPage,
  ReportPage,
  TrainingModulesPage,
  CompanyReportsPage,
  ReportDetailsPage,
  TrainningModuleDetailPage,
} from "@Pages";
import { SessionProvider } from "@Context";
import { Footer, Header } from "@Components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SessionProvider>
          <Header />
          <Switch>
            <Route exact path={routes.REPORT_PAGE} component={ReportPage} />
            <Route
              exact
              path={`${routes.REPORT_PAGE}/:id`}
              component={ReportDetailsPage}
            />
            <Route exact path={routes.HOME_PAGE}>
              <LoginPage />
            </Route>
            <Route exact path={routes.TRAINING_MODULES_PAGE}>
              <TrainingModulesPage />
            </Route>
            <Route
              exact
              path={`${routes.TRAINING_MODULES_PAGE}/:id`}
              component={TrainningModuleDetailPage}
            />
            <Route exact path={routes.COMPANY_REPORTS_PAGE}>
              <CompanyReportsPage />
            </Route>
          </Switch>
        </SessionProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
