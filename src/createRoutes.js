import React from 'react';
import { IndexRoute, Route } from 'react-router';

import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import RootPage from './pages/RootPage';
import AdminLoginPage from './pages/admin/AdminLogInPage';
import CreatePackageRootPage from './pages/configurator/CreatePackageRootPage';
import CreatePackageBeerPage from './pages/configurator/CreatePackageBeerPage';
import CreatePackageMessagePage
  from './pages/configurator/CreatePackageMessagePage';
import CreatePackagePackagePage
  from './pages/configurator/CreatePackagePackagePage';
import CreatePackageSummaryPage
  from './pages/configurator/CreatePackageSummaryPage';
import PackageOverviewRootPage
  from './pages/packages_overview/PackageOverviewRootPage';
import CreatePackageSupplementPage
  from './pages/configurator/CreatePackageSupplementPage';
import PackageOverviewSummaryPage
  from './pages/packages_overview/PackageOverviewSummaryPage';
import PackageOverviewPackagesPage
  from './pages/packages_overview/PackageOverviewPackagesPage';
import PackageOverviewDelPayPage
  from './pages/packages_overview/PackageOverviewDelPayPage';
import PackageOverviewDeliveryDetailsPage
  from './pages/packages_overview/PackageOverviewDeliveryDetailsPage';
import RegistrationPage from './pages/RegistrationPage';
import ContactPage from './pages/ContactPage';
import BusinessConditionsPage from './pages/BusinessConditionsPage';
import AboutUs from './pages/AboutUs';
import AdminRootPage from './pages/admin/AdminRootPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminSuppliersPage from './pages/admin/AdminSuppliersPage';

export function createRoutes(store) {
  const requireAuthAdmin = (nextState, replace) => {
    //right now we allow anyone who is authenticated
    const { auth } = store.getState();
    if (!auth.isAuthenticated) {
      replace('/admin');
    }
  };

  return (
    <Route path="/">
      <Route path="/admin">
        <IndexRoute component={AdminLoginPage} />
        <Route component={AdminRootPage}>
          <Route
            path="customers"
            component={AdminCustomersPage}
            onEnter={requireAuthAdmin}
          />
          <Route
            path="orders"
            component={AdminOrdersPage}
            onEnter={requireAuthAdmin}
          />
          <Route
            path="products"
            component={AdminProductsPage}
            onEnter={requireAuthAdmin}
          />
          <Route
            path="suppliers"
            component={AdminSuppliersPage}
            onEnter={requireAuthAdmin}
          />
        </Route>
      </Route>
      <Route component={RootPage}>
        <IndexRoute component={HomePage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/create-package" component={CreatePackageRootPage} >
          <IndexRoute component={CreatePackageBeerPage} />
          <Route path="supplement" component={CreatePackageSupplementPage} />
          <Route path="package" component={CreatePackagePackagePage} />
          <Route path="message" component={CreatePackageMessagePage} />
          <Route path="summary" component={CreatePackageSummaryPage} />
        </Route>
        <Route path="/package-overview" component={PackageOverviewRootPage} >
          <IndexRoute component={PackageOverviewPackagesPage} />
          <Route path="summary" component={PackageOverviewSummaryPage} />
          <Route path="del-pay" component={PackageOverviewDelPayPage} />
          <Route
            path="del-details"
            component={PackageOverviewDeliveryDetailsPage}
          />
        </Route>
        <Route path="/contact" component={ContactPage} />
        <Route path="/conditions" component={BusinessConditionsPage} />
        <Route path="/about_us" component={AboutUs} />
        <Route path="*" component={PageNotFound} />
      </Route>
    </Route>
  );
}
