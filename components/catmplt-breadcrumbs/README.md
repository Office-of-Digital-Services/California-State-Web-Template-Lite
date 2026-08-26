# Template Breadcrumbs Component

## Custom Tag Usage
Use this component with its custom wrapper tag:

```html
<catmplt-breadcrumbs>
  <!-- component markup -->
</catmplt-breadcrumbs>
```


The Template Breadcrumbs component displays a breadcrumb trail for page hierarchy. It uses the `<catmplt-breadcrumbs>` root class and an ordered list (`ol`) of breadcrumb items.

## Features

- Semantic breadcrumb navigation using `nav` with `aria-label`.
- Responsive typography using CSS variables.
- Visual separators between breadcrumb items using a pseudo-element.
- Optional dark-mode variant via `data-mode="dark"`.

## Required HTML Structure

Use this structure:

```html
<nav aria-label="Breadcrumbs">
  <ol>
    <li><a href="javascript:;" title="Home page">Breadcrumb 1</a></li>
    <li><a href="javascript:;" title="Section page">Breadcrumb 2</a></li>
    <li>Breadcrumb 3</li>
  </ol>
</nav>
```

Notes:

- The root element must include `<catmplt-breadcrumbs>`.
- Breadcrumb items must be direct children of the `ol`.
- The current page item is typically the last `li` and may be non-linked.

## Dark Mode Variant

Set `data-mode="dark"` on the root nav element to switch breadcrumb text and links to white:

```html
<nav aria-label="Breadcrumbs" data-mode="dark">
  ...
</nav>
```

In dark mode:

- Item text color uses `var(--white, #fff)`.
- Link, hover, and focus colors use `var(--white, #fff)`.

## CSS Variable Fallbacks

The component includes fallbacks for variables used by typography and spacing:

- `--font-size-small` falls back to `0.875rem`.
- `--ratio` falls back to `0.1vw`.
- `--grid-gutter-width` falls back to `1rem`.
- `--text-muted` falls back to `var(--gray-700, #5e5e6a)`.

These fallbacks ensure usable rendering when theme variables are missing.
