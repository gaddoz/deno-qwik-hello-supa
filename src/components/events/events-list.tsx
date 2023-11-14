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
          <div class="title"><a href={`${paths.events }/${event.slug}`}>{event.title}</a></div>
          <div>
            <p>
              <a href={`${paths.events }/${event.slug}`}>info</a>
            </p>
            <p><a href={`${paths.events }/${event.slug}`}>details</a></p>
          </div>
        </div>
      ))}
  </>);
});
