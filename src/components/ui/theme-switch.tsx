import { component$ } from "@builder.io/qwik";
import { LuSun } from "@qwikest/icons/lucide";
const themes = ['color-1','dark','dark-2','color-2','light'];
export const ThemeSwitch = component$(() => {
    return (
      <div class="flex items-center mx-auto h-full pr-3 text-3xl">
        <label class="switch">
          <LuSun 
            id="toggle-theme"
            onClick$={() => {
              const theme = document.documentElement.className;
              let pos = (themes.findIndex((t) => t === theme)) +1;
              if(pos >= themes.length) {
                pos = 0;
              }
              const newTheme = themes[pos];
              document.documentElement.className = newTheme;
              localStorage.setItem("theme",newTheme);
            }}/>
          <span class="slider round"></span>
        </label>
      </div>
    );
  });