import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getSupabaseInstance } from "~/routes/plugin";

export const useDbEventsBySlug = routeLoader$(async (requestEvent) => {
  const sb = getSupabaseInstance(requestEvent);
  const { data } = await sb
    .from("events")
    .select("*")
    .filter("slug", "eq", requestEvent.params.slug);
  if (data && data.length > 0) {
    return data[0];
  }
  return {
    id: "missing",
    slug: "not-found",
    title: "missing",
    public: 0,
  };
});

export default component$(() => {
  useDbEventsBySlug();
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
