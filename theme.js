(function () {
  // Load saved theme on page load
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Attach toggle if button exists
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    toggle.onclick = () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    };
  });
})();
