import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSupabaseSignInWithOtp } from "~/routes/plugin";

export const MagicLinkForm = component$(() => {
  const action = useSupabaseSignInWithOtp();

  return (
    <Form class="flex flex-col gap-2" action={action}>
      <div class="form-control w-full">
        <label for="email" class="label">
          Email
        </label>
        <input
          id="email-magic-link"
          placeholder="Email"
          name="email"
          type="email"
        />
        <span class="error">{JSON.stringify(action.value)}</span>
      </div>

      <span class="error">{action.value?.formErrors?.[0]}</span>
      <button class="btn btn-primary mt-2" type="submit">
        Login with Magic Link
      </button>
    </Form>
  );
});
