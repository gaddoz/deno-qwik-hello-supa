import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getSupabaseSession } from "../plugin";
import { paths } from "~/utils/paths";

export const useAuthRoute = routeLoader$((event) => {
  const session = getSupabaseSession(event);
  if (!session?.user.email) {
    throw event.redirect(302, paths.login);
  }
  return session;
});

export default component$(() => {
  const session = useAuthRoute();
  return (
    <div class="card">
      <div>
        <p>your email: {session.value.user.email}</p>
        <p>your role: {session.value.user.role}</p>
        <p>your avatar_url: {session.value.user.user_metadata.avatar_url}</p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "dashboard",
  meta: [
    {
      name: "description",
      content: "dashboard, demo for deno with qwik",
    },
  ],
};
