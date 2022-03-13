<script>
  import EventRepository from "../repositories/event_repository";
  import ModalDetailEvent from "../components/company/ModalDetailEvent.svelte";
  import { onMount } from "svelte";
  import { auth } from "../store";
  import { get } from "svelte/store";

  let events = [];
  let showDetailEvent = false;
  let selectedEvent = null;

  const getEvents = async () => {
    const res = await EventRepository.fetchEvents();
    if (res.data) {
      let temp = get(auth);
      let ev = res.data;
      let data = [];
      ev.map((event, index) => {
        if (event.company_id == temp.id) {
          data.push(event);
        }
      });
      if (data.length > 0) {
        events = data;
      }
    }
  };

  const formatDate = (dateData) => {
    let date = new Date(JSON.parse(dateData));
    return date.toLocaleDateString("en-US");
  };

  const deleteEvent = async (ev) => {
    let submittedData = {
      id: ev._id,
    };
    const res = await EventRepository.deleteEvent(submittedData);
    await getEvents();
  };

  const showDetail = (ev) => {
    selectedEvent = ev;
    showDetailEvent = true;
  };

  onMount(async () => {
    await getEvents();
  });
</script>

<div>
  <div class="max-w-6xl mx-auto py-8">
    <div
      class="bg-blue-400 hover:bg-blue-800 text-white border-2 border-white rounded-lg py-2 px-4 cursor-pointer w-fit mb-4"
    >
      <p class="font-bold">Create New Event</p>
    </div>
    <table class="shadow-lg bg-white w-full">
      <thead>
        <tr>
          <th class="bg-blue-100 border text-left px-8 py-4"> Event Name </th>
          <th class="bg-blue-100 border text-left px-8 py-4"> Vendor Name </th>
          <th class="bg-blue-100 border text-left px-8 py-4">
            Confirmed Date
          </th>
          <th class="bg-blue-100 border text-left px-8 py-4">Status</th>
          <th class="bg-blue-100 border text-left px-8 py-4"> Date Created </th>
          <th class="bg-blue-100 border text-left px-8 py-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each events as event}
          <tr>
            <td class="border px-8 py-4">{event.event_name}</td>
            <td class="border px-8 py-4">{event.vendor_name}</td>
            <td class="border px-8 py-4">
              {event.confirm_date
                ? `${formatDate(event.confirm_date)}`
                : `${formatDate(event.proposed_date_1)} (Proposed Date)`}
            </td>
            <td class="border px-8 py-4">{event.status}</td>
            <td class="border px-8 py-4">
              {formatDate(event.created_at)}
            </td>
            <td class="border px-8 py-4 flex space-x-2">
              <div
                class="bg-blue-400 hover:bg-blue-800 text-white border-2 border-white rounded-lg py-2 px-4 cursor-pointer w-fit"
                on:click={() => showDetail(event)}
              >
                <p class="font-bold">View</p>
              </div>
              <div
                class="bg-red-400 hover:bg-red-800 text-white border-2 border-white rounded-lg py-2 px-4 cursor-pointer w-fit"
                on:click={deleteEvent(event)}
              >
                <p class="font-bold">Delete</p>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if showDetailEvent}
      <ModalDetailEvent
        event={selectedEvent}
        bind:showDetail={showDetailEvent}
      />
    {/if}
  </div>
</div>
