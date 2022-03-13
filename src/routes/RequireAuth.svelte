<script>
  import { useNavigate } from "svelte-navigator";
  import { auth } from "../store";

  const navigate = useNavigate();

  $: if (!$auth) {
    navigate("/");
  }
</script>

{#if $auth}
  <slot />
{/if}
