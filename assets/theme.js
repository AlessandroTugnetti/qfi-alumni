(() => {
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "qfi-theme";
  let selected;
  try {
    selected = localStorage.getItem(storageKey);
  } catch {
    // The theme still works when storage is unavailable.
  }

  const isDark = () => (selected ?? (system.matches ? "dark" : "light")) === "dark";
  const apply = () => { root.dataset.theme = isDark() ? "dark" : "light"; };
  apply();

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-toggle");
    const sync = () => {
      apply();
      button.setAttribute("aria-pressed", String(isDark()));
      button.title = isDark() ? "Switch to light mode" : "Switch to dark mode";
    };

    button.addEventListener("click", () => {
      selected = isDark() ? "light" : "dark";
      try {
        localStorage.setItem(storageKey, selected);
      } catch {
        // Keep the choice for the current page.
      }
      sync();
    });
    system.addEventListener("change", sync);
    sync();
    button.hidden = false;
  });
})();
