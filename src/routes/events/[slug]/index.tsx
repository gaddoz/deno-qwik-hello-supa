/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { useDbEventsBySlug } from "./layout";
import { paths } from "~/utils/paths";

export default component$(() => {
  const event = useDbEventsBySlug();
  return (
    <div class="card">
      <h3>{event.value.title}</h3>
      <div>slug: {event.value.title}</div>
      <div>is public {event.value.public==0?'yes':'no'}</div>
      <div><a href={paths.events}>back</a></div>
    </div>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      content: "event detail (todo)",
      name: "description",
    },
  ],
  title: "event title (todo)",
};
