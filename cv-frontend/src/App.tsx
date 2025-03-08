import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/customLinearProgress.component";
// Import with lazy loading
const Home = lazy(() => import("./pages/home.page"));
const Companies = lazy(() => import("./pages/companies.page"));
const AddCompany = lazy(() => import("./pages/add-company.page"));
const Jobs = lazy(() => import("./pages/jobs.page"));
const AddJob = lazy(() => import("./pages/add-job.page"));
const Candidates = lazy(() => import("./pages/candidates.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";

  return (
    <div className={appStyle}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route path="/companies">
              <Route
                index
                element={<Companies />}
              ></Route>
              <Route
                path="add"
                element={<AddCompany />}
              ></Route>
            </Route>
            <Route path="/jobs">
              <Route
                index
                element={<Jobs />}
              ></Route>
              <Route
                path="add"
                element={<AddJob />}
              ></Route>
            </Route>
            <Route
              path="/candidates"
              element={<Candidates />}
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
