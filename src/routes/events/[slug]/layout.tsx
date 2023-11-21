import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getSupabaseInstance } from "~/routes/plugin";
import { paths } from "~/utils/paths";

export const useDbEventsBySlug = routeLoader$(async (requestEvent) => {
  const sb = getSupabaseInstance(requestEvent);
  const { data } = await sb
    .from("events")
    .select("*")
    .filter("slug", "eq", requestEvent.params.slug);
  if (data && data.length > 0) {
    return data[0];
  }
  else if(requestEvent.pathname === paths.events_new){
    return {};
  }
  else {
    console.log('me bef redir',requestEvent.pathname);
    throw requestEvent.redirect(302, paths.events);
  }
});

export default component$(() => {
  useDbEventsBySlug();
  return (
      <main>
        <Slot />
      </main>
  );
});
