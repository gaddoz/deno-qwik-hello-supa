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
      <div class="flex justify-between items-start items-center">
        <h1 class="title">{event.value.title} **</h1>
        {user.value?.user.id === event.value.owner_id && <>
            {editMode.value !== true && <Link href='edit' class="btn btn-primary">edit</Link>}
        </>}
      </div>
      <div>
        <p>is public {event.value.public==0?'yes':'no'}</p>
        {event.value.description &&<p>
          Description: {event.value.description}
        </p>}
        {event.value.location && <p>
          Location: {event.value.location}
        </p>}
      </div>
      <div class="mt-5"><a href={paths.events} class="btn btn-secondary">back</a></div>
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
