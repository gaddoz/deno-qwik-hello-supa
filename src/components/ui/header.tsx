import { component$ } from "@builder.io/qwik";
import { Form, Link, useDocumentHead } from "@builder.io/qwik-city";
import { useSession } from "~/routes/layout";
import { useSupabaseSignOut } from "~/routes/plugin";
import { paths } from "~/utils/paths";

export default component$(() => {
  const head = useDocumentHead();
  const user = useSession();
  const signOut = useSupabaseSignOut();
  return (
    <>
        <header class="header">
            <nav class="nav">
                <ul>
                    <li class="active">
                        <Link href={paths.index}>Home</Link>
                    </li>
                    <li>
                        <Link href={paths.events}>Events</Link>
                    </li>
                    {user.value && <>
                    <li>
                        <Link href={paths.dashboard}>Dashboard</Link>
                    </li>
                    <li>
                        <Form action={signOut}>
                            <button class="btn">Sign Out</button>
                        </Form>
                    </li>
                    </>}
                    {!user.value && <>
                    <li>
                        <Link href={paths.login}>Login</Link>
                    </li>
                    <li>
                        <Link href={paths.register}>Register</Link>
                    </li>
                    </>}
                </ul>
            </nav>
        </header>
        <h1 class="title">{head.title}</h1>
    </>
  );
});
