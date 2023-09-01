import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./app/store";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import HomePage from "./pages/HomePage";
import EmployeesListPage from "./pages/EmployeesListPage";
import CreateEmployeePage from "./pages/CreateEmployeePage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/employees/create" element={<CreateEmployeePage />} />
      <Route path="/employees/list" element={<EmployeesListPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EmployeeProvider>
      <RouterProvider router={router} />
    </EmployeeProvider>
  </React.StrictMode>
);

reportWebVitals();

