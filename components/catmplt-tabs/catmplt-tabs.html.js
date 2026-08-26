// MutationObserver.
/**
 * Observes attribute changes for a list of elements.
 * @param {Element[]} elements Elements to observe.
 * @param {(target: Element, attributeName: string) => void} callback Callback for attribute mutations.
 * @returns {() => void} Disconnect function.
 */
function observeAttributeChange(elements, callback) {
  const MutationObserverImpl =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  if (!MutationObserverImpl) {
    return function noop() {};
  }

  const observer = new MutationObserverImpl(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes") {
        callback(mutation.target, mutation.attributeName);
      }
    });
  });

  elements.forEach(element => {
    observer.observe(element, { subtree: false, attributes: true });
  });

  return function disconnect() {
    observer.disconnect();
  };
}

// Initializes tab-like behavior for a details/summary group and returns cleanup.
/**
 * Sets up tab-like behavior for a details/summary container.
 * @param {Element | null} container Details group container.
 * @returns {() => void} Cleanup function.
 */
function setupDetailsTabs(container) {
  if (!container) {
    return function noop() {};
  }

  const detailsItems = Array.from(container.querySelectorAll("details"));
  const summaries = Array.from(container.querySelectorAll("details > summary"));

  detailsItems.forEach(item => {
    item.classList.add("details-item");
  });

  summaries.forEach(summary => {
    summary.classList.add("details-tab");
  });

  // Keep exactly one panel open: opening one details closes the rest.
  const disconnectObserver = observeAttributeChange(
    detailsItems,
    (target, attributeName) => {
      if (attributeName === "open" && target.hasAttribute("open")) {
        detailsItems.forEach(item => {
          if (item !== target) {
            item.removeAttribute("open");
          }
        });
      }
    }
  );

  /**
   * Prevents closing the active tab when clicking its summary.
   * @param {Event} event Summary click event.
   * @returns {void}
   */
  function preventClosingIfAlreadyOpen(event) {
    const details = event.currentTarget.parentElement;
    if (details && details.hasAttribute("open")) {
      event.preventDefault();
    }
  }

  // Tabs should not toggle closed when the currently open summary is activated.
  /**
   * Handles keyboard activation for summary elements.
   * @param {KeyboardEvent} event Keyboard event.
   * @returns {void}
   */
  function onKeyDown(event) {
    if (event.key === " " || event.key === "Enter") {
      preventClosingIfAlreadyOpen(event);
    }
  }

  summaries.forEach(summary => {
    summary.addEventListener("keydown", onKeyDown);
    summary.addEventListener("click", preventClosingIfAlreadyOpen);
  });

  // React-like cleanup: remove listeners and disconnect observer on unmount.
  return function cleanup() {
    disconnectObserver();
    summaries.forEach(summary => {
      summary.removeEventListener("keydown", onKeyDown);
      summary.removeEventListener("click", preventClosingIfAlreadyOpen);
    });
  };
}

// Expose initializer for framework integration (e.g. useEffect).
window.setupDetailsTabs = setupDetailsTabs;

const desktopTabsMediaQuery = window.matchMedia("(min-width: 768px)");
let tabsCleanup = null;

/**
 * Ensures exactly one details panel remains open on desktop.
 * @param {Element | null} container Details group container.
 * @returns {void}
 */
function ensureDesktopOpenState(container) {
  if (!container) {
    return;
  }

  const detailsItems = Array.from(container.querySelectorAll("details"));
  if (detailsItems.length === 0) {
    return;
  }

  const openItems = detailsItems.filter(item => {
    return item.hasAttribute("open");
  });

  // Keep one currently open item if present; otherwise default to the first tab.
  const itemToKeepOpen = openItems[0] || detailsItems[0];
  detailsItems.forEach(item => {
    if (item === itemToKeepOpen) {
      item.setAttribute("open", "");
    } else {
      item.removeAttribute("open");
    }
  });
}

/**
 * Enables or disables desktop tab behavior based on media query state.
 * @param {MediaQueryList | MediaQueryListEvent} event Media query state carrier.
 * @returns {void}
 */
function toggleResponsiveTabs(event) {
  const isDesktop = event.matches;
  const tabsContainer = document.querySelector('[data-name="tabs-container"]');

  if (isDesktop) {
    if (!tabsCleanup) {
      ensureDesktopOpenState(tabsContainer);
      tabsCleanup = setupDetailsTabs(tabsContainer);
    }
    return;
  }

  if (tabsCleanup) {
    tabsCleanup();
    tabsCleanup = null;
  }
}

/**
 * Initializes responsive tab behavior and media query listeners.
 * @returns {void}
 */
function initializeTabs() {
  toggleResponsiveTabs(desktopTabsMediaQuery);

  if (typeof desktopTabsMediaQuery.addEventListener === "function") {
    desktopTabsMediaQuery.addEventListener("change", toggleResponsiveTabs);
  } else {
    desktopTabsMediaQuery.addListener(toggleResponsiveTabs);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTabs);
} else {
  initializeTabs();
}
