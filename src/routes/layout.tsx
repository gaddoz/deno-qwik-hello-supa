import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import QwikLogo from './../images/qwik.svg?jsx';

import styles from "./styles.css?inline";
import Header from "~/components/ui/header";
import { getSupabaseInstance, getSupabaseSession } from "./plugin";
import npminfo from './../../package.json';

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
      <main class="container mx-auto">
        <Slot />
      </main>
      <footer>
        <div class="flex flex-col items-center justify-center text-center m-5">
            <div class="flex flex-row">
              <a href="https://qwik.builder.io" target="_blank">
                <QwikLogo alt="Qwik" class="w-6 mr-2 mt{-1px}" />
              </a>
              <a href="https://deno.land" target="_blank">
                <img alt="Deno" src="https://dash.deno.com/assets/logo.svg" class="w-5 mr-2" width={5} height={5} />
              </a>
              <a href="https://supabase.com" target="_blank">
                <img alt="supabase" src="https://supabase.com/dashboard/img/supabase-logo.svg" class="w-5" width={5} height={5}/>
              </a>
            </div>
            <div class="mb-2 text-s"><a href="https://github.com/gaddoz/deno-qwik-hello-supa" target="_blank">qwik on deno with supabase</a></div>
            <div class="mb-2 text-xs"><a href="https://github.com/gaddoz/deno-qwik-hello-supa" target="_blank">[{npminfo.name}@{npminfo.version}]</a></div>
        </div>
      </footer>
    </>
  );
});
