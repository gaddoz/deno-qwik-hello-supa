import { component$, useSignal } from "@builder.io/qwik";
import { Form, useDocumentHead } from "@builder.io/qwik-city";
import { useSession } from "~/routes/layout";
import { useSupabaseSignOut } from "~/routes/plugin";
import { paths } from "~/utils/paths";
import { ThemeSwitch } from "./theme-switch";
import { LuMenu } from "@qwikest/icons/lucide";
export default component$(() => {
  const menuOpen = useSignal(false);
  const head = useDocumentHead();
  const user = useSession();
  const signOut = useSupabaseSignOut();
  return (
    <>
        <header class="header">
            <div class="w-10 sm:hidden">
                <div 
                    class="flex items-center mx-auto h-full pl-3 text-6xl" 
                    onClick$={() => {
                        menuOpen.value = !menuOpen.value;
                    }}>
                    <LuMenu />
                </div>
            </div>
            <nav class={`nav ${menuOpen.value ? 'open':'closed'}`}>
                <ul>
                    <li class="active">
                        <a href={paths.index}>Deno Qwik Hello Supa</a>
                    </li>
                    <li>
                        <a href={paths.events}>Events</a>
                    </li>
                    {user.value && <>
                    <li>
                        <a href={paths.dashboard}>Dashboard</a>
                    </li>
                    <li>
                        <Form action={signOut}>
                            <button class="btn">Sign Out</button>
                        </Form>
                    </li>
                    </>}
                    {!user.value && <>
                    <li>
                        <a href={paths.login}>Login</a>
                    </li>
                    <li>
                        <a href={paths.register}>Register</a>
                    </li>
                    </>}
                </ul>
                <h1 class="title mobile">Deno Qwik Hello Supa</h1>
            </nav>
            <div class="w-10">
                <ThemeSwitch />
            </div>
        </header>
        <div class="container mx-auto">
            <h1 class="title">{head.title}</h1>
        </div>
    </>
  );
});
