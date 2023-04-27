import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/Route";
import Layout from "./layout/Layout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => {
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
