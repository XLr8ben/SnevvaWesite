/**
 * components/loader.js
 * Dynamically injects shared header and footer into any page.
 *
 * Usage in any HTML page:
 *   <div id="header-placeholder"></div>   ← goes where you want the nav
 *   <div id="footer-placeholder"></div>   ← goes where you want the footer
 *   <script src="/components/loader.js"></script>
 */

(function () {
  /**
   * Fetch an HTML snippet and inject it into a target element.
   * After injection, run an optional callback (for post-render logic).
   */
  async function injectComponent(url, targetId, callback) {
    const target = document.getElementById(targetId);
    if (!target) return; // placeholder not on this page — skip

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
      target.innerHTML = await res.text();
      if (typeof callback === "function") callback(target);
    } catch (err) {
      console.warn("[loader.js]", err.message);
    }
  }

  /** Set the current year in any .current-year element inside a container */
  function stampYear(container) {
    container.querySelectorAll(".current-year").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /** Highlight the active nav link based on current URL */
  function markActiveLink(container) {
    const path = window.location.pathname;
    container.querySelectorAll("a").forEach((a) => {
      // Strip hash so /page.html#section still matches /page.html
      const href = a.getAttribute("href")?.split("#")[0] || "";
      if (href && path.endsWith(href)) {
        a.classList.add("active");
      }
    });
  }

  // ── Run on DOM ready ──────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    injectComponent("/components/header.html", "header-placeholder", markActiveLink);
    injectComponent("/components/footer.html", "footer-placeholder", stampYear);
  });
})();
