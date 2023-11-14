import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSupabaseSignInWithPassword } from "~/routes/plugin";

export const PasswordForm = component$(() => {
  const action = useSupabaseSignInWithPassword();

  return (
    <Form class="flex flex-col gap-2" action={action}>
      <h2 class="text-xl">Sign in with password</h2>

      <div class="form-control w-full">
        <label for="email" class="label">
          Email
        </label>
        <input
          id="email"
          placeholder="Email"
          name="email"
          type="email"
        />
        <span class="error">
          {action.value?.fieldErrors?.email?.[0]}
        </span>
      </div>

      <div class="form-control w-full">
        <label for="password" class="label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
        />
        <span class="error">
          {action.value?.fieldErrors?.password?.[0]}
        </span>
      </div>

      <span class="error">{action.value?.formErrors?.[0]}</span>
      <button class="btn btn-primary mt-2" type="submit">
        Sign In
      </button>
    </Form>
  );
});
/*

*/
