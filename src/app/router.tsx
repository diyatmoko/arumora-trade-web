import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import LandingPage from "../layouts/LandingPage";
import LoginPage from "../layouts/LoginPage";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../layouts/DashboardPage";
import PortfolioPage from "../layouts/PortfolioPage";
import MarketsPage from "../layouts/MarketsPage";
import PositionsPage from "../layouts/PositionsPage";
import OrdersPage from "../layouts/OrdersPage";
import TransactionsPage from "../layouts/TransactionsPage";
import BotsPage from "../layouts/BotsPage";
import StrategiesPage from "../layouts/StrategiesPage";
import AnalyticsPage from "../layouts/AnalyticsPage";
import SettingsPage from "../layouts/SettingsPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: "portfolio",
        element: <PortfolioPage />,
      },

      {
        path: "markets",
        element: <MarketsPage />,
      },

      {
        path: "positions",
        element: <PositionsPage />,
      },

      {
        path: "orders",
        element: <OrdersPage />,
      },

      {
        path: "transactions",
        element: <TransactionsPage />,
      },

      {
        path: "bots",
        element: <BotsPage />,
      },

      {
        path: "strategies",
        element: <StrategiesPage />,
      },

      {
        path: "analytics",
        element: <AnalyticsPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
