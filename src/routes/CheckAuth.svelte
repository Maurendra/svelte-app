<script>
  import { useNavigate } from "svelte-navigator";
  import { auth } from "../store";

  const navigate = useNavigate();

  $: if ($auth) {
    if ($auth.role == "vendor") {
      navigate("/vendor-dashboard");
    } else {
      navigate("/company-dashboard");
    }
  }
</script>

{#if !$auth}
  <slot />
{/if}
