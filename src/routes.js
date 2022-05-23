import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Reset from "./pages/fortgoPassword";
import Patient from "./pages/Patient";
import NotFound from "./pages/Page404";
import Personnel from "./pages/Personnel";
import Stock from "./pages/Stock";
import EtatStock from "./pages/EtatStock";
import NewPatient from "./pages/NewPatient";
import Settings from "./components/_dashboard/personnel/Setting";
import DashboardApp from "./pages/DashboardApp";
import NewPersonnel from "./pages/NewPersonnel";
import PageDetail from "./pages/detailPatient/Details";
import MoreDetail from "./pages/detailPatient/MoreDetails";
import NewOperation from "./pages/NewOperation";
import Update from "./pages/detailPatient/Update";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: localStorage.getItem("token") ? (
        <Navigate to="/dashboard/app" replace />
      ) : (
        <Login />
      ),
    },
    {
      path: "/renitialiser_psw",
      element: <Reset />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" replace /> },
        { path: "setting", element: <Settings /> },
        { path: "patient", element: <Patient /> },
        { path: "app", element: <DashboardApp /> },
        { path: "personnel", element: <Personnel /> },
        { path: "stock", element: <Stock /> },
        { path: "stock/etat_stock", element: <EtatStock /> },
        {
          path: "patient/detail_patient/:id",
          element: <PageDetail />,
        },
        { path: "patient/detail_patient/more/:id", element: <MoreDetail /> },
        { path: "patient/update_patient/:id", element: <Update /> },
        { path: "patient/add_Patient", element: <NewPatient /> },
        { path: "stock/add_Operation", element: <NewOperation /> },
        { path: "personnel/add_Personnel", element: <NewPersonnel /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
