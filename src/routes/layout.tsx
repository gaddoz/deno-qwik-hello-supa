import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./styles.css?inline";
import Header from "~/components/ui/header";
import { getSupabaseInstance, getSupabaseSession } from "./plugin";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useSession = routeLoader$((event) => {
  return getSupabaseSession(event);
});

export const useDbEvents = routeLoader$(async (requestEvent) => {
  const sb = getSupabaseInstance(requestEvent);
  const query = sb.from("events").select("*");
  const { data } = await query;
  return data;
});

export default component$(() => {
  useStyles$(styles);
  useDbEvents();
  useSession();
  return (
    <>
      <Header/>
      <main>
        <Slot />
      </main>
    </>
  );
});
