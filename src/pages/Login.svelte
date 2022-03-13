<script>
  import UserRepositories from "../repositories/user_repository";
  import { auth } from "../store";
  import { useNavigate } from "svelte-navigator";

  let username;
  let password;

  const navigate = useNavigate();

  const getUsers = async () => {
    const res = await UserRepositories.fetchUsers();
    if (res.data) {
      let users = res.data;
      users.map((user, index) => {
        if (user.username == username && user.password == password) {
          let data = {
            id: user._id,
            role: user.type,
            name: user.name,
          };
          auth.set(data);
          if (data.role == "vendor") {
            navigate("/vendor-dashboard");
          } else {
            navigate("/company-dashboard");
          }
        }
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await getUsers();
  };
</script>

<div>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <div class="w-2/6 mb-4">
      <p class="text-2xl font-bold">Svelte App</p>
      <p class="mb-4 text-xs">Event Organizer</p>
      <form class="bg-blue-900 p-8 rounded-lg border-2" on:submit={onSubmit}>
        <h1 class="font-bold text-4xl text-white mb-4">Sign In</h1>
        <div class="mb-4">
          <div class="mb-4">
            <div
              class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
            >
              <input
                type="text"
                class="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                placeholder="Username"
                bind:value={username}
              />
            </div>
          </div>
          <div>
            <div
              class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
            >
              <input
                type="password"
                class="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                placeholder="Password"
                bind:value={password}
              />
            </div>
          </div>
        </div>
        <div class="flex items-center w-full justify-center">
          <button
            type="submit"
            class="bg-white hover:bg-blue-400 hover:text-white border-2 border-neutral-600 rounded-lg py-4 px-12 cursor-pointer w-fit"
          >
            <p class="font-bold">Sign In</p>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
