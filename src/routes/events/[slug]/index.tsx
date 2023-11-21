/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { useDbEventsBySlug } from "./layout";
import { paths } from "~/utils/paths";
import { useSession } from "~/routes/layout";

export default component$(() => {
  const editMode = useSignal(false);
  const event = useDbEventsBySlug();
  const user = useSession();
  return (
    <div class="card">
      <h3>{event.value.title}</h3>
      {user.value?.user.id === event.value.owner_id && <>
          {editMode.value !== true && <Link href='edit'>[edit]</Link>}
      </>}
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
