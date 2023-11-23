import { component$ } from "@builder.io/qwik";
import { useDbEvents } from "~/routes/layout";
import { paths } from "~/utils/paths";

export default component$(() => {
  const eventsList = useDbEvents();
  return (<>
    {eventsList.value?.length && eventsList.value.length > 0 && eventsList.value.map((event) => (
        <div
          key={`items-${event.id}`}
          class="card"
        >
          <h1 class="title"><a href={`${paths.events }/${event.slug}`}>{event.title}</a></h1>
          <div>
            {event.description &&<p>
              Description: {event.description}
            </p>}
            {event.location && <p>
              Location: {event.location}
            </p>}
            <p class="mt-2"><a href={`${paths.events }/${event.slug}`} class="btn btn-primary">details</a></p>
          </div>
        </div>
      ))}
  </>);
});
