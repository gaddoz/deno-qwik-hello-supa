import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSupabaseSignUp } from "~/routes/plugin";

export const RegisterForm = component$(() => {
  const signUp = useSupabaseSignUp();

  return (
    <Form class="flex flex-col gap-2" action={signUp}>
      <div class="form-control w-full">
        <label for="email" class="label">
          Email
        </label>
        <input
          placeholder="Email"
          id="email"
          name="email"
          type="email"
        />
        <span class="error">
          {signUp.value?.fieldErrors?.email?.[0]}
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
          {signUp.value?.fieldErrors?.password?.[0]}
        </span>
      </div>

      <span class="error">{signUp.value?.formErrors?.[0]}</span>

      <button class={"btn btn-primary mt-2"} type="submit">
        Sign Up
      </button>
    </Form>
  );
});
