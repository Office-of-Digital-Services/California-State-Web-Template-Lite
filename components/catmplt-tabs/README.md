# Template Tabs Component

## Custom Tag Usage
Use this component with its custom wrapper tag:

```html
<catmplt-tabs>
  <!-- component markup -->
</catmplt-tabs>
```


The Template Tabs component is a progressively enhanced tabbed interface built on native `details` and `summary` elements. It features a custom-tag wrapper architecture (`<catmplt-tabs>`) combined with lightweight JavaScript that ensures only one tab is open at a time. The component includes responsive styling for both mobile and desktop viewports, with optional CSS custom property overrides for customization.

## Initial Structure

The component's HTML structure must remain consistent, as the CSS and JavaScript rely on this exact nesting to apply styles and manage tab interaction behavior.

```html
<!--
  Tabs Container
  Manages multiple tab panels with only one open at a time
-->
<div>
  <!-- First Tab (open by default) -->
  <details name="template-tabs" open>
    <summary>First tab</summary>
    <div>
      <h2>First tab content</h2>
      <p>This is some content for the first tab.</p>
    </div>
  </details>

  <!-- Second Tab -->
  <details name="template-tabs">
    <summary>Second tab</summary>
    <div>
      <h2>Second tab content</h2>
      <p>This is some content for the second tab.</p>
    </div>
  </details>

  <!-- Third Tab -->
  <details name="template-tabs">
    <summary>Third tab</summary>
    <div>
      <h2>Third tab content</h2>
      <p>This is some content for the third tab.</p>
    </div>
  </details>
</div>
```

## Component Features

### Tab Behavior

The component uses the HTML5 `details` and `summary` elements with a shared `name` attribute to create a mutually exclusive tab group:

- Only one `details` element can be open at a time
- Opening a new tab automatically closes the previously open tab
- The `open` attribute specifies which tab is initially displayed
- Clicking a tab header toggles its corresponding panel
- Already-open tabs cannot be closed by clicking their header again

### Responsive Design

The component adapts to different screen sizes:

- **Mobile (< 768px)**: Tabs display in a stacked layout with tab headers styled with background color and larger font size
- **Desktop (≥ 768px)**: Tabs display in a horizontal layout with tab headers styled inline

### JavaScript Enhancement

The included JavaScript (`template-tabs.html.js`) provides:

- Initialization of tab behavior via the `setupDetailsTabs()` function
- Management of mutually exclusive open state using `MutationObserver`
- Keyboard accessibility (Enter/Space to activate tabs)
- Prevention of closing the currently open tab
- Media query monitoring to ensure proper state management during responsive transitions
- Automatic addition of `.details-item` and `.details-tab` classes to managed elements

## CSS Custom Properties

The component uses CSS custom properties for styling customization:

### Mobile Styling

- `--tabs-mobile-background-color` (default: `#f5f5f5`): Background color of tab headers on mobile devices
- `--link-color` (default: `#046b99`): Text color of tab headers
- `--font-family-sans-serif` (default: `"Public Sans", system-ui, -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", "Noto Sans", sans-serif`): Font family used for tab text

### Example Custom Styling

```html
<style>
  :root {
    --tabs-mobile-background-color: #e8e8e8;
    --link-color: #0066cc;
    --font-family-sans-serif: Arial, sans-serif;
  }
</style>
```

## Framework Integration

To initialize tabs in a framework context (React, Vue, etc.), use the exposed `setupDetailsTabs()` function:

```javascript
import { setupDetailsTabs } from "./template-tabs.html.js";

// In component mount/useEffect
const container = document.querySelector("<catmplt-tabs>");
const cleanup = setupDetailsTabs(container);

// In component unmount/cleanup
return cleanup;
```

The function returns a cleanup function that removes all event listeners and disconnects observers.
