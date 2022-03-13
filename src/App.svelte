<script>
  import Router from "./routes/index.svelte";
  import { onMount } from "svelte";
  import http_request from "./utils/http_request";

  onMount(async () => {
    http_request.init();
  });
</script>

<main>
  <Router />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
