import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import EventList from "~/components/events/events-list";

export default component$(() => {
  return (
    <div class="card">
      <EventList></EventList>
    </div>
  );
});

export const head: DocumentHead = {
  title: "home",
  meta: [
    {
      name: "description",
      content: "homepage, demo for deno with qwik",
    },
  ],
};
