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
import { ControlPanel } from "./pages/control-panel";
import { ConsultCompany } from "./pages/consult-company";
import { ConsultPerson } from "./pages/consult-person";
import { RegisterCompany } from "./pages/register-company";
import { RegisterPerson } from "./pages/register-person";
import {ConsultReports} from "./pages/consult-reports";
import ReportDetailsAdminPage from "./pages/report-details-admin";
import {ChangePasswordPage} from "./pages/change-password";

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
            <Route
                exact
                path={`${routes.ADMIN_REPORT_PAGE}/:id`}
                component={ReportDetailsAdminPage}
            />
            <Route exact path={routes.HOME_PAGE}>
              <LoginPage />
            </Route>
            <Route exact path={routes.CHANGE_PASSWORD}>
              <ChangePasswordPage />
            </Route>
            <Route exact path={routes.TRAINING_MODULES_PAGE}>
              <TrainingModulesPage />
            </Route>
            <Route exact path={routes.CONTROL_PANEL}>
              <ControlPanel />
            </Route>
            <Route exact path={routes.REGISTER_COMPANY}>
              <RegisterCompany />
            </Route>
            <Route exact path={`${routes.REGISTER_COMPANY}/:cnpj`}>
              <RegisterCompany />
            </Route>
            <Route exact path={routes.REGISTER_PERSON}>
              <RegisterPerson />
            </Route>
            <Route exact path={`${routes.REGISTER_PERSON}/:cpf`}>
            <RegisterPerson />
          </Route>
            <Route exact path={routes.CONSULT_COMPANY}>
              <ConsultCompany />
            </Route>
            <Route exact path={routes.CONSULT_PERSON}>
              <ConsultPerson />
            </Route>
            <Route
              exact
              path={`${routes.TRAINING_MODULES_PAGE}/:id`}
              component={TrainningModuleDetailPage}
            />
            <Route exact path={routes.COMPANY_REPORTS_PAGE}>
              <CompanyReportsPage />
            </Route>
            <Route exact path={routes.CONSULT_REPORTS}>
              <ConsultReports/>
            </Route>
          </Switch>
        </SessionProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
