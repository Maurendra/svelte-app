<script>
  import { auth } from "../store";

  const logout = async () => {
    auth.set(null);
  };
</script>

<div class="py-4 bg-white border-b" v-if="isAuthenticated">
  <div class="flex items-center max-w-6xl mx-auto justify-between px-4">
    <router-link to="/">
      <p class="text-primary cursor-pointer text-base font-semibold">
        {$auth ? $auth.name : "TSP"}
      </p>
    </router-link>
    <div class="flex space-x-4 items-center">
      <router-link to="/">
        <p class="text-neutral-600 cursor-pointer text-xs">EVENTS</p>
      </router-link>

      <div class="py-2">
        <p class="text-neutral-600 cursor-pointer text-xs" on:click={logout}>
          LOGOUT
        </p>
      </div>
    </div>
  </div>
</div>
