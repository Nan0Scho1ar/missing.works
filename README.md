# n0s1.net

A minimal digital garden built with vanilla HTML, CSS, and JavaScript.

## Overview

This is the source for [n0s1.net](https://n0s1.net), a personal blog/digital garden. Posts are organized by growth stage (seedling -> sprout -> growing -> tree) to reflect how ideas develop over time.

## Structure

```
index.html      # Homepage with post listing
main.js         # Web components for headers, post links, and content
styles.css      # Styling
posts/          # Individual posts as HTML files
```

## Adding Posts

Create a new HTML file in `posts/` with the naming convention:

```
YYYY-MM-DD-Post-Title.html
```

Hyphens in the post title will be converted to spaces automatically unless wrapped in plus signs. E.G.

```
YYYY-MM-DD-Hyphened+-+post-Title.html
```

Then add a `<post-link>` entry to `index.html`:

```html
<post-link href="posts/YYYY-MM-DD-Post-Title.html"></post-link>
```

## Local Development

Just open `index.html` in a browser. If you really want to get fancy, you can also serve it with any static file server. E.G.

```bash
python -m http.server 8000
```

## License
What little code exists, is licenced under the GPLv3.
`styles.css` is entirely machine generated, so who knows ¯\\_(ツ)_/¯ 