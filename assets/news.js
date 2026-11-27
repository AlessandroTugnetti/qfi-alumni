document.querySelectorAll(".news-archive").forEach((archive) => {
  const tablist = archive.querySelector('[role="tablist"]');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  if (!tabs.length) return;

  const selectYear = (selected) => {
    tabs.forEach((tab, index) => {
      const active = index === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
    });
  };

  tabs.forEach((tab, index) => {
    const panel = panels[index];
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    panel.querySelector("h3").hidden = true;
    tab.addEventListener("click", () => selectYear(index));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectYear(next);
      tabs[next].focus();
    });
  });

  selectYear(0);
  tablist.hidden = false;
});
