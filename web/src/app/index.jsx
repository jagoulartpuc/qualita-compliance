import { LoginPage, ReportPage, HomePage } from "@Pages";
import { SessionProvider } from "@Context";
import { Footer, Header } from "@Components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path={routes.REPORT_PAGE}>
            <ReportPage />
          </Route>
          <SessionProvider>
            <Route exact path={routes.HOME_PAGE}>
              <LoginPage />
            </Route>
            <Route exact path={routes.USER_PAGE}>
              <HomePage />
            </Route>
          </SessionProvider>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
