# Demo Pages

Temporary product-design demos live here as standalone static pages.

Vite copies this directory into the production build unchanged, so files placed
here are served from the site root:

- `public/demo/strategy-card.html` -> `/demo/strategy-card.html`
- `public/demo/strategy-card/index.html` -> `/demo/strategy-card/`

Use standalone HTML, CSS, and browser-safe JavaScript. Keep assets for a demo in
the same subdirectory when the page needs images, JSON, or other local files.

## Demo lifecycle

Demo pages are visual artifacts, not product truth. Current product rules live
in MonoMeta `docs/product`.

Add a lifecycle marker in the page `<head>` when the page is not an ordinary
active demo:

```html
<meta name="demo-status" content="exploration">
<meta name="demo-status" content="archived">
```

- `exploration`: a proposal that has not been selected as the current direction.
- `archived`: a dated snapshot kept for visual or decision history.
- no marker: an active demo; this still does not imply the feature is shipped.

Archived pages should show their snapshot date and link to the current source
of truth. Do not keep a copied Product Spec in sync here.

After changing a title or lifecycle marker, run `npm run demo:index` and commit
the generated `index.html` and `_switcher.js`.
