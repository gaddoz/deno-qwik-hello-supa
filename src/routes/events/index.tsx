/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import EventList from "~/components/events/events-list";

export default component$(() => {
  return (
    <div class="card">
        <Link href="new/edit">new event</Link>
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
