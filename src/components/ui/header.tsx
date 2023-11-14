import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import { paths } from "~/utils/paths";

export default component$(() => {
  const head = useDocumentHead();
  return (
    <>
        <header class="header">
            <nav class="nav">
                <ul>
                    <li class="active">
                        <a href={paths.index}>Home</a>
                    </li>
                    <li>
                        <a href={paths.dashboard}>Dashboard</a>
                    </li>
                    <li>
                        <a href={paths.events}>Events</a>
                    </li>
                    <li>
                        <a href={paths.login}>Login</a>
                    </li>
                    <li>
                        <a href={paths.register}>Register</a>
                    </li>
                </ul>
            </nav>
        </header>
        <h1 class="title">{head.title}</h1>
    </>
  );
});
