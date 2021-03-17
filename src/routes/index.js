import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
//===============================
const Produtos = lazy(() => import("../pages/Produtos"));
const Entrada = lazy(() => import("../pages/Entrada"));
const Saida = lazy(() => import("../pages/Saida"));
//===============================
const FormProduto = lazy(() => import("../pages/forms/FormProduto"));
const FormEntrada = lazy(() => import("../pages/forms/FormEntrada"));
const FormSaida = lazy(() => import("../pages/forms/FormSaida"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/produtos",
    component: Produtos,
  },
  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/formProdutos",
    component: FormProduto,
  },
  {
    path: "/entrada",
    component: Entrada,
  },
  {
    path: "/formEntrada",
    component: FormEntrada,
  },
  {
    path: "/saida",
    component: Saida,
  },
  {
    path: "/formSaida",
    component: FormSaida,
  },

];

export default routes;
