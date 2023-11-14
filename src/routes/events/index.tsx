/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import EventList from "~/components/events/events-list";

export default component$(() => {
  return (
    <div class="card">
        <EventList></EventList>
    </div>
  )
});

export const head: DocumentHead = {
  meta: [
    {
      content: "events",
      name: "description",
    },
  ],
  title: "events",
};
