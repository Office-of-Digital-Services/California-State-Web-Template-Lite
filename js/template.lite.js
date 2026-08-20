var StateTemplateNpmPackageVersion="0.0.1";
//@ts-check

/**
 * Polyfill to support grouping <details> elements via the NAME property.
 * Safari 16.5 and earlier do not support details.name
 */
function detailsNamePolyfill$3() {
  const test = document.createElement("details");
  test.setAttribute("name", "x");
  const supportsName = test.name === "x";

  if (!supportsName) {
    const accordions = document.querySelectorAll("details[name]");
    accordions.forEach(details => {
      const detailsElement = /** @type {HTMLDetailsElement} */ (details);
      detailsElement.addEventListener("toggle", () => {
        if (detailsElement.open) {
          accordions.forEach(other => {
            const otherElement = /** @type {HTMLDetailsElement} */ (other);
            if (
              otherElement.open &&
              otherElement !== detailsElement &&
              otherElement.getAttribute("name") ===
                detailsElement.getAttribute("name")
            ) {
              otherElement.open = false;
              console.log("POLYFILL: details.name closed");
            }
          });
        }
      });
    });
  }
}

/**
 * Toggle aria-expanded attribute on all details elements in the button group
 */
function cagovHeaderFullAccessibilityToggle() {
  const detailsToggles = document.querySelectorAll(
    'details[name="cagov-header-full__buttongroup"]'
  );

  detailsToggles.forEach(detailsToggle => {
    const detailsElement = /** @type {HTMLDetailsElement} */ (detailsToggle);
    if (!detailsElement.hasAttribute("aria-expanded")) {
      detailsElement.setAttribute("aria-expanded", "false");
    }

    detailsElement.addEventListener("toggle", () => {
      const isOpen = detailsElement.hasAttribute("open");
      detailsElement.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}

/**
 * Initialize component
 */
function initCagovHeaderFull() {
  detailsNamePolyfill$3();
  cagovHeaderFullAccessibilityToggle();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCagovHeaderFull);
} else {
  // DOM already loaded (framework hydration, dynamic insertion, etc.)
  initCagovHeaderFull();
}

// Export for framework usage (e.g., React, Vue)
if (typeof window !== "undefined") {
  window.detailsNamePolyfill = detailsNamePolyfill$3;
  window.cagovHeaderFullAccessibilityToggle =
    cagovHeaderFullAccessibilityToggle;
  window.initCagovHeaderFull = initCagovHeaderFull;
}

//@ts-check

/**
 * Polyfill to support grouping <details> elements via the NAME property.
 * Safari 16.5 and earlier do not support details.name
 */
function detailsNamePolyfill$2() {
  const test = document.createElement("details");
  test.setAttribute("name", "x");
  const supportsName = test.name === "x";

  if (!supportsName) {
    const accordions = document.querySelectorAll("details[name]");
    accordions.forEach(details => {
      const detailsElement = /** @type {HTMLDetailsElement} */ (details);
      detailsElement.addEventListener("toggle", () => {
        if (detailsElement.open) {
          accordions.forEach(other => {
            const otherElement = /** @type {HTMLDetailsElement} */ (other);
            if (
              otherElement.open &&
              otherElement !== detailsElement &&
              otherElement.getAttribute("name") ===
                detailsElement.getAttribute("name")
            ) {
              otherElement.open = false;
              console.log("POLYFILL: details.name closed");
            }
          });
        }
      });
    });
  }
}

/**
 * Toggle aria-expanded attribute on all details elements in the button group.
 */
function cagovUtilityHeaderAccessibilityToggle() {
  const detailsToggles = document.querySelectorAll(
    'details[name="cagov-utility-header__buttongroup"]'
  );

  detailsToggles.forEach(detailsToggle => {
    const detailsElement = /** @type {HTMLDetailsElement} */ (detailsToggle);
    if (!detailsElement.hasAttribute("aria-expanded")) {
      detailsElement.setAttribute("aria-expanded", "false");
    }

    detailsElement.addEventListener("toggle", () => {
      const isOpen = detailsElement.hasAttribute("open");
      detailsElement.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}

/**
 * Initialize component.
 */
function initCagovUtilityHeader() {
  detailsNamePolyfill$2();
  cagovUtilityHeaderAccessibilityToggle();
}

// Initialize when DOM is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCagovUtilityHeader);
} else {
  // DOM already loaded (framework hydration, dynamic insertion, etc.)
  initCagovUtilityHeader();
}

// Export for framework usage (e.g., React, Vue).
if (typeof window !== "undefined") {
  window.detailsNamePolyfill = detailsNamePolyfill$2;
  window.cagovUtilityHeaderAccessibilityToggle =
    cagovUtilityHeaderAccessibilityToggle;
  window.initCagovUtilityHeader = initCagovUtilityHeader;
}

class TemplateAccordion {
  constructor(el, settings) {
    this.group = el;
    this.details = this.group.getElementsByTagName("details");
    this.toggles = this.group.getElementsByTagName("summary");
    this.contents = this.group.querySelectorAll("details > div");

    // Set default settings if necessary
    this.settings = Object.assign(
      {
        speed: 300,
        one_visible: false
      },
      settings
    );

    // Setup inital positions
    for (let i = 0; i < this.details.length; i++) {
      const detail = this.details[i];
      const toggle = this.toggles[i];
      const content = this.contents[i];

      // Set transition-duration to match JS setting
      detail.style.transitionDuration = this.settings.speed + "ms";

      // Set initial height to transition from
      if (!detail.hasAttribute("open")) {
        detail.style.height = toggle.offsetHeight + "px";
      } else {
        detail.style.height = toggle.offsetHeight + content.offsetHeight + "px";
      }
    }

    // Setup click handler
    this.group.addEventListener("click", e => {
      if (e.target.tagName.toLowerCase() === "summary") {
        e.preventDefault();

        let num = 0;
        for (let i = 0; i < this.toggles.length; i++) {
          if (this.toggles[i] === e.target) {
            num = i;
            break;
          }
        }

        if (!e.target.parentNode.hasAttribute("open")) {
          this.open(num);
        } else {
          this.close(num);
        }
      }
    });
  }

  open(i) {
    const detail = this.details[i];
    const toggle = this.toggles[i];
    const content = this.contents[i];

    // If applicable, hide all the other details first
    if (this.settings.one_visible) {
      for (let a = 0; a < this.toggles.length; a++) {
        if (i !== a) this.close(a);
      }
    }

    // Update class
    detail.classList.remove("is-closing");
    detail.classList.add("is-opening");

    // Get height of toggle
    const toggle_height = toggle.offsetHeight;

    // Momentarily show the contents just to get the height
    detail.setAttribute("open", true);
    const content_height = content.offsetHeight;
    detail.removeAttribute("open");

    // Set the correct height and let CSS transition it
    detail.style.height = toggle_height + content_height + "px";

    // Finally set the open attr
    detail.setAttribute("open", true);

    setTimeout(() => {
      detail.classList.remove("is-opening");
    }, this.settings.speed);
  }

  close(i) {
    const detail = this.details[i];
    const toggle = this.toggles[i];

    // Update class
    detail.classList.remove("is-opening");
    detail.classList.add("is-closing");

    // Get height of toggle
    const toggle_height = toggle.offsetHeight;

    // Set the height so only the toggle is visible
    detail.style.height = toggle_height + "px";

    setTimeout(() => {
      // Check if still closing
      if (detail.classList.contains("is-closing"))
        detail.removeAttribute("open");
      detail.classList.remove("is-closing");
    }, this.settings.speed);
  }
}

/**
 * Initialize template accordion instances.
 */
function initTemplateAccordion() {
  const els = document.getElementsByClassName("template-accordion");

  for (let i = 0; i < els.length; i++) {
    const accordionElement = /** @type {HTMLElement} */ (els[i]);

    // Prevent duplicate listeners if init runs multiple times.
    if (accordionElement.dataset.templateAccordionInitialized === "true") {
      continue;
    }

    const isSingle = els[i].getAttribute("data-open") === "single";
    new TemplateAccordion(els[i], {
      speed: 300,
      one_visible: isSingle
    });
    accordionElement.dataset.templateAccordionInitialized = "true";
  }
}

// Initialize when DOM is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTemplateAccordion);
} else {
  // DOM already loaded (framework hydration, dynamic insertion, etc.)
  initTemplateAccordion();
}

// Export for framework usage (e.g., React, Vue).
if (typeof window !== "undefined") {
  window.initTemplateAccordion = initTemplateAccordion;
}

//@ts-check

/**
 * Polyfill to support grouping <details> elements via the NAME property.
 * Safari 16.5 and earlier do not support details.name
 */
function detailsNamePolyfill$1() {
  const test = document.createElement("details");
  test.setAttribute("name", "x");
  const supportsName = test.name === "x";

  if (!supportsName) {
    const accordions = document.querySelectorAll("details[name]");
    accordions.forEach(details => {
      const detailsElement = /** @type {HTMLDetailsElement} */ (details);
      detailsElement.addEventListener("toggle", () => {
        if (detailsElement.open) {
          accordions.forEach(other => {
            const otherElement = /** @type {HTMLDetailsElement} */ (other);
            if (
              otherElement.open &&
              otherElement !== detailsElement &&
              otherElement.getAttribute("name") ===
                detailsElement.getAttribute("name")
            ) {
              otherElement.open = false;
              console.log("POLYFILL: details.name closed");
            }
          });
        }
      });
    });
  }
}

/**
 * Toggle aria-expanded attribute on all details elements in the button group.
 */
function templateHeaderFullAccessibilityToggle() {
  const detailsToggles = document.querySelectorAll(
    'details[name="template-header-full__buttongroup"]'
  );

  detailsToggles.forEach(detailsToggle => {
    const detailsElement = /** @type {HTMLDetailsElement} */ (detailsToggle);
    if (!detailsElement.hasAttribute("aria-expanded")) {
      detailsElement.setAttribute("aria-expanded", "false");
    }

    detailsElement.addEventListener("toggle", () => {
      const isOpen = detailsElement.hasAttribute("open");
      detailsElement.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}

/**
 * Initialize component.
 */
function initTemplateHeaderFull() {
  detailsNamePolyfill$1();
  templateHeaderFullAccessibilityToggle();
}

// Initialize when DOM is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTemplateHeaderFull);
} else {
  // DOM already loaded (framework hydration, dynamic insertion, etc.)
  initTemplateHeaderFull();
}

// Export for framework usage (e.g., React, Vue).
if (typeof window !== "undefined") {
  window.detailsNamePolyfill = detailsNamePolyfill$1;
  window.templateHeaderFullAccessibilityToggle =
    templateHeaderFullAccessibilityToggle;
  window.initTemplateHeaderFull = initTemplateHeaderFull;
}

/**
 * Polyfill to support grouping <details> elements via the NAME property.
 * Safari 16.5 and earlier do not support details.name
 */
function detailsNamePolyfill() {
  const test = document.createElement("details");
  test.setAttribute("name", "x");
  const supportsName = test.name === "x";

  if (!supportsName) {
    const accordions = document.querySelectorAll("details[name]");
    accordions.forEach(details => {
      details.addEventListener("toggle", () => {
        if (details.open) {
          accordions.forEach(other => {
            if (
              other.open &&
              other !== details &&
              other.getAttribute("name") === details.getAttribute("name")
            ) {
              other.open = false;
              console.log("POLYFILL: details.name closed");
            }
          });
        }
      });
    });
  }
}

/**
 * Toggle aria-expanded attribute on details element
 */
function templateSideNavigationToggle() {
  const detailsToggle = document.querySelector(
    "[aria-controls='template-side-navigation-content']"
  );
  if (!detailsToggle) return;

  // Check if aria-expanded exists, if not, set it to false
  if (!detailsToggle.hasAttribute("aria-expanded")) {
    detailsToggle.setAttribute("aria-expanded", "false");
  }

  // Listen for toggle event and update aria-expanded
  detailsToggle.closest("details")?.addEventListener("toggle", () => {
    const isOpen = detailsToggle.closest("details")?.hasAttribute("open");
    detailsToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

/**
 * Initialize component
 */
function initTemplateSideNavigation() {
  detailsNamePolyfill();
  templateSideNavigationToggle();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTemplateSideNavigation);
} else {
  // DOM already loaded (framework hydration, dynamic insertion, etc.)
  initTemplateSideNavigation();
}

// Export for framework usage (e.g., React, Vue)
if (typeof window !== "undefined") {
  window.detailsNamePolyfill = detailsNamePolyfill;
  window.templateSideNavigationToggle = templateSideNavigationToggle;
  window.initTemplateSideNavigation = initTemplateSideNavigation;
}

// MutationObserver.
    function observeAttributeChange(elements, callback) {
        var MutationObserverImpl = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (!MutationObserverImpl) {
            return function noop() { };
        }

        var observer = new MutationObserverImpl(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes") {
                    callback(mutation.target, mutation.attributeName);
                }
            });
        });

        elements.forEach(function (element) {
            observer.observe(element, { subtree: false, attributes: true });
        });

        return function disconnect() {
            observer.disconnect();
        };
    }

    // Initializes tab-like behavior for a details/summary group and returns cleanup.
    function setupDetailsTabs(container) {
        if (!container) {
            return function noop() { };
        }

        var detailsItems = Array.from(container.querySelectorAll("details"));
        var summaries = Array.from(container.querySelectorAll("details > summary"));

        detailsItems.forEach(function (item) {
            item.classList.add("details-item");
        });

        summaries.forEach(function (summary) {
            summary.classList.add("details-tab");
        });

        // Keep exactly one panel open: opening one details closes the rest.
        var disconnectObserver = observeAttributeChange(detailsItems, function (target, attributeName) {
            if (attributeName === "open" && target.hasAttribute("open")) {
                detailsItems.forEach(function (item) {
                    if (item !== target) {
                        item.removeAttribute("open");
                    }
                });
            }
        });

        function preventClosingIfAlreadyOpen(event) {
            var details = event.currentTarget.parentElement;
            if (details && details.hasAttribute("open")) {
                event.preventDefault();
            }
        }

        // Tabs should not toggle closed when the currently open summary is activated.
        function onKeyDown(event) {
            if (event.key === " " || event.key === "Enter") {
                preventClosingIfAlreadyOpen(event);
            }
        }

        summaries.forEach(function (summary) {
            summary.addEventListener("keydown", onKeyDown);
            summary.addEventListener("click", preventClosingIfAlreadyOpen);
        });

        // React-like cleanup: remove listeners and disconnect observer on unmount.
        return function cleanup() {
            disconnectObserver();
            summaries.forEach(function (summary) {
                summary.removeEventListener("keydown", onKeyDown);
                summary.removeEventListener("click", preventClosingIfAlreadyOpen);
            });
        };
    }

    // Expose initializer for framework integration (e.g. useEffect).
    window.setupDetailsTabs = setupDetailsTabs;

    var desktopTabsMediaQuery = window.matchMedia("(min-width: 768px)");
    var tabsCleanup = null;

    function ensureDesktopOpenState(container) {
        if (!container) {
            return;
        }

        var detailsItems = Array.from(container.querySelectorAll("details"));
        if (detailsItems.length === 0) {
            return;
        }

        var openItems = detailsItems.filter(function (item) {
            return item.hasAttribute("open");
        });

        // Keep one currently open item if present; otherwise default to the first tab.
        var itemToKeepOpen = openItems[0] || detailsItems[0];
        detailsItems.forEach(function (item) {
            if (item === itemToKeepOpen) {
                item.setAttribute("open", "");
            } else {
                item.removeAttribute("open");
            }
        });
    }

    function toggleResponsiveTabs(event) {
        var isDesktop = event.matches;
        var tabsContainer = document.querySelector(".template-tabs-container");

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
