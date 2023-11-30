import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { SportsApi } from "~/lib/typescript-fetch-client-generated";

export const useSports = routeLoader$((event) => {
  const basepath = event.env.get("PUBLIC_SUPABASE_URL")+'/rest/v1';
  const apikey = event.env.get("PUBLIC_SUPABASE_ANON_KEY");
  const api = new SportsApi({
      basePath: basepath,
  }, basepath, fetch);
  
  return api.sportsGet(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    {
      headers: {
        apikey:apikey
    }}
    ).then(res => {
      console.log("🚀 ~ file: sports/index.tsx:24 ~ useSports ~ res:", res);
      return res;
  }).catch(err => {
      console.log("🚀 ~ file: sports/index.tsx:27 ~ useSports ~ err:", err);
      return [];
  })
});


export default component$(() => {
  const sports = useSports();
  return (
    <>
      <div class="card">
        <button onClick$={() => {
          console.log('todo');
        }}>add new sport (todo)</button>
      </div>
      <div class="card">
        {sports.value.length > 0 && sports.value.map((sport) => (
          <div
            key={`items-${sport.id}`}
            class="card"
          >
            <h1 class="title">{sport.name}</h1>
            <button onClick$={() => {
              console.log('todo');
            }}>edit (todo)</button>
            </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "sports",
  meta: [
    {
      name: "description",
      content: "sports",
    },
  ],
};