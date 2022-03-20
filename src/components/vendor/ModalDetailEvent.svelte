<script>
  import EventRepository from "../../repositories/event_repository";
  export let event, showDetail, getData;

  let showModalApprove = false;
  let showModalReject = false;
  let showMainModal = true;
  let note = "";

  const formatDate = (dateData) => {
    let date = new Date(JSON.parse(dateData));
    return date.toLocaleDateString("en-US");
  };

  const approve = async (date) => {
    let submittedData = {
      id: event._id,
      status: "accepted",
      confirm_date: JSON.stringify(new Date(JSON.parse(date))),
    };
    const res = await EventRepository.updateEvent(submittedData);
    showModalApprove = false;
    showMainModal = true;
    showDetail = false;
    await getData();
  };

  const reject = async () => {
    let submittedData = {
      id: event._id,
      status: "rejected",
      note: note,
    };
    const res = await EventRepository.updateEvent(submittedData);
    showModalReject = false;
    showMainModal = true;
    showDetail = false;
    await getData();
  };
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
      class="fixed inset-0 transition-opacity bg-black bg-opacity-75"
      aria-hidden="true"
      on:click={() => {
        showDetail = !showDetail;
      }}
    />

    {#if showMainModal}
      <div
        class="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
      >
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-lg font-bold text-neutral-800">Event Detail</h1>
        </div>
        <div class="mb-8">
          <p class="text-sm text-neutral-600 text-justify mb-2">
            Event Name: {event.event_name}
          </p>
          <p class="text-sm text-neutral-600 text-justify mb-2">
            Vendor Name: {event.vendor_name}
          </p>
          <p class="text-sm text-neutral-600 text-justify mb-2">
            Proposed Date: {`${formatDate(event.proposed_date_1)}, ${formatDate(
              event.proposed_date_2
            )}, ${formatDate(event.proposed_date_3)} `}
          </p>
          <p class="text-sm text-neutral-600 text-justify mb-2">
            Confirmed date by vendor: {event.confirm_date
              ? formatDate(event.confirm_date)
              : "Not confirmed yet by the vendor"}
          </p>
          <p class="text-sm text-neutral-600 text-justify mb-2">
            Current Status: {event.status}
          </p>
          <p class="text-sm text-neutral-600 text-justify mb-2">
            Location: {event.location ? event.location : "-"}
          </p>
          <p class="text-sm text-neutral-600 text-justify mb-2">
            Note: {event.note ? event.note : "-"}
          </p>
          {#if event.status == "active"}
            <div class="flex space-x-4 items-end">
              <div
                on:click={() => {
                  showMainModal = false;
                  showModalApprove = true;
                }}
                class="bg-green-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p class="font-bold text-neutral-50">Approve</p>
              </div>

              <div
                on:click={() => {
                  showMainModal = false;
                  showModalReject = true;
                }}
                class="bg-red-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p class="font-bold text-neutral-50">Reject</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    {#if showModalApprove}
      <div
        class="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
      >
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-lg font-bold text-neutral-800">Approve Event</h1>
        </div>
        <p class="text-sm text-neutral-600 text-justify mb-8">
          Choose one of the proposed dates below
        </p>
        <div class="mb-6">
          <div class="mb-4">
            <p class="mb-2">Proposed Date 1</p>
            <div class="flex justify-between">
              <div
                class="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                {formatDate(event.proposed_date_1)}
              </div>
              <div
                on:click={() => approve(event.proposed_date_1)}
                class="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p class="font-bold text-neutral-50">Approve</p>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <p class="mb-2">Proposed Date 2</p>
            <div class="flex justify-between">
              <div
                class="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                {formatDate(event.proposed_date_2)}
              </div>
              <div
                on:click={() => approve(event.proposed_date_2)}
                class="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p class="font-bold text-neutral-50">Approve</p>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <p class="mb-2">Proposed Date 3</p>
            <div class="flex justify-between">
              <div
                class="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                {formatDate(event.proposed_date_3)}
              </div>
              <div
                on:click={() => approve(event.proposed_date_3)}
                class="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p class="font-bold text-neutral-50">Approve</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            on:click={() => {
              showModalApprove = false;
              showMainModal = true;
            }}
            class="bg-blue-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p class="font-bold text-neutral-50">Cancel</p>
          </div>
        </div>
      </div>
    {/if}

    {#if showModalReject}
      <div
        class="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
      >
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-lg font-bold text-neutral-800">Reject Event</h1>
        </div>
        <p class="text-sm text-neutral-600 text-justify mb-8">
          Fill the form below the reason why the event being rejected
        </p>
        <div class="mb-6">
          <textarea
            class="w-full p-4 border-2 bg-neutral-50 rounded-lg text-neutral-600 text-sm"
            placeholder="Please fill this form"
            bind:value={note}
          />
        </div>
        <div class="flex space-x-4">
          <div
            on:click={() => {
              reject();
            }}
            class="bg-red-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p class="font-bold text-neutral-50">Reject</p>
          </div>
          <div
            on:click={() => {
              showModalReject = false;
              showMainModal = true;
            }}
            class="bg-blue-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p class="font-bold text-neutral-50">Cancel</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
