/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import EventList from "~/components/events/events-list";

export default component$(() => {
  return (
    <div class="card">
        <div class="p-2">
          <Link href="new/edit" class="btn btn-primary">new event</Link>
        </div>
        <div>
          <EventList></EventList>
        </div>
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
