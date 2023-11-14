import { component$ } from "@builder.io/qwik";
import { Form, useNavigate } from "@builder.io/qwik-city";
import { useSupabaseSignInWithOAuth } from "~/routes/plugin";

export const GitHubForm = component$(() => {
  const action = useSupabaseSignInWithOAuth();
  const navigate = useNavigate();

  return (
    <Form
      class="flex flex-col gap-2"
      action={action}
      onSubmitCompleted$={() => {
        const url = action.value?.url;
        if (url) {
          navigate(url);
        }
      }}
    >
      <input type="hidden" name="provider" value="github" />
      <button class="btn btn-primary" type="submit">
        Github
      </button>
    </Form>
  );
});
