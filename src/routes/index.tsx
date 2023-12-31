import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import EventList from "~/components/events/events-list";

export default component$(() => {
  return (
    <>
      <div class="card">
        <p>This is a sample app demonstrating edge ssr with deno deploy and qwik.</p>
        <p>Consumes Auth and Api with RLS from supabase.</p>
        <p>Here you can see a list of public events.</p>
        <p>Login and create your events.</p>
        <p><a href="https://github.com/gaddoz/deno-qwik-hello-world/" target="_blank">Source code available on github: github.com/gaddoz/deno-qwik-hello-world</a></p>
      </div>
      <div class="card">
        <h1 class="title">event list</h1>
        <EventList></EventList>
      </div>
    </>
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
