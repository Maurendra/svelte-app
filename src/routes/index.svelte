<script>
  import { Router, Route, useNavigate } from "svelte-navigator";
  import CompanyDashboard from "../pages/CompanyDashboard.svelte";
  import VendorDashboard from "../pages/VendorDashboard.svelte";
  import Login from "../pages/Login.svelte";
  import CheckAuth from "./CheckAuth.svelte";
  import RequireAuth from "./RequireAuth.svelte";
  import Header from "../components/Header.svelte";
</script>

<Router>
  <Route path="vendor-dashboard">
    <RequireAuth>
      <Header />
      <VendorDashboard />
    </RequireAuth>
  </Route>

  <Route path="company-dashboard">
    <RequireAuth>
      <Header />
      <CompanyDashboard />
    </RequireAuth>
  </Route>

  <Route path="/">
    <CheckAuth>
      <Login />
    </CheckAuth>
  </Route>
</Router>
