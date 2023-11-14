import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getSupabaseSession } from "~/routes/plugin";
import { paths } from "~/utils/paths";
import { GoogleForm } from "./GoogleForm/GoogleForm";
import { MagicLinkForm } from "./MagicLinkForm/MagicLinkForm";
import { PasswordForm } from "./PasswordForm/PasswordForm";
import { GitHubForm } from "./GithubForm/GitHubForm";

export const useAnonymousRoute = routeLoader$((event) => {
  const session = getSupabaseSession(event);
  if (session?.user.email) {
    throw event.redirect(302, paths.dashboard);
  }
  return session;
});

export default component$(() => {
  useAnonymousRoute();
  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-6">
        <PasswordForm />
        <GitHubForm />
        <GoogleForm />
        <MagicLinkForm />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "login",
};
