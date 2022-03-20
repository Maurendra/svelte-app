<script>
  import UserRepository from "../../repositories/user_repository";
  import EventRepository from "../../repositories/event_repository";
  import { onMount } from "svelte";
  import { auth } from "../../store";

  let vendors = [];
  let vendor = null;
  let companyName = $auth.name;
  let location;
  let eventName;
  let date1 = new Date();
  let date2 = new Date();
  let date3 = new Date();

  export let showModal, getData;

  const formatDate = (dateData) => {
    let date = new Date(JSON.parse(dateData));
    return date.toLocaleDateString("en-US");
  };

  const getVendors = async () => {
    const res = await UserRepository.fetchVendor();
    if (res.data) {
      if (res.data.length > 0) {
        vendors = res.data;
        vendor = res.data[0];
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let submittedData = {
      company_id: $auth.id,
      vendor_id: vendor._id,
      vendor_name: vendor.name,
      event_name: eventName,
      proposed_date_1: JSON.stringify(date1),
      proposed_date_2: JSON.stringify(date2),
      proposed_date_3: JSON.stringify(date3),
      confirm_date: null,
      status: "active",
      created_at: JSON.stringify(new Date()),
      location: location,
    };
    let res = await EventRepository.createEvent(submittedData);
    showModal = false;
    await getData();
  };

  const handleChangeVendor = (e) => {
    vendor = JSON.parse(e.target.value);
  };

  onMount(async () => {
    await getVendors();
  });
</script>

<div
  class="fixed inset-0 z-10 overflow-y-auto overscroll-contain"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="flex items-center justify-center w-full min-h-screen px-4 pt-4 pb-20 text-center sm:p-0"
  >
    <div
      on:click={() => {
        showModal = !showModal;
      }}
      class="fixed inset-0 transition-opacity bg-black bg-opacity-75"
      aria-hidden="true"
    />

    <form
      on:submit={onSubmit}
      class="w-3/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
    >
      <div class="flex justify-between items-center mb-2">
        <h1 class="text-lg font-bold text-neutral-800">Create New Event</h1>
      </div>
      <div class="mb-4">
        <div class="mb-4">
          <p class="mb-2">Company Name</p>
          <div
            class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
          >
            <input
              type="text"
              bind:value={companyName}
              class="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
              disabled
            />
          </div>
        </div>
        <div class="mb-4">
          <p class="mb-2">Proposed Date 1</p>
          <div
            class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
          >
            <input type="date" bind:value={date1} />
          </div>
        </div>
        <div class="mb-4">
          <p class="mb-2">Proposed Date 2</p>
          <div
            class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
          >
            <input type="date" bind:value={date2} />
          </div>
        </div>
        <div class="mb-4">
          <p class="mb-2">Proposed Date 3</p>
          <div
            class="w-full py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
          >
            <input type="date" bind:value={date3} />
          </div>
        </div>
        <div class="mb-4">
          <p class="mb-2">Proposed Locations</p>
          <div
            class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
          >
            <input
              bind:value={location}
              type="text"
              class="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
            />
          </div>
        </div>
        <div class="mb-4">
          <p class="mb-2">Event Name</p>
          <div
            class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
          >
            <input
              bind:value={eventName}
              type="text"
              class="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
            />
          </div>
        </div>
        <div class="mb-4">
          <p class="mb-2">Vendor</p>
          <select
            on:change={handleChangeVendor}
            class="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
          >
            {#each vendors as ven}
              <option value={JSON.stringify(ven)}>
                {ven.name}
              </option>
            {/each}
          </select>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <button
          type="submit"
          class="bg-neutral-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
        >
          <p class="font-bold text-neutral-50">Submit</p>
        </button>
      </div>
    </form>
  </div>
</div>
