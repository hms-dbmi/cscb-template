MultiPage SinglePaged Template
===============================

This project builds on the [SinglePaged Jekyll template](https://github.com/t413/SinglePaged) created by [Tim O'Brien](http://t413.com/).
It is created for the Center for Stem Cell Bioinformatics and may be re-used and adapted for own purposes.

## Usage

Instead of all content being located in the `_posts` directory and sorted & rendered out in one single page as in the original SinglePaged template, you must define your collections in `_config.yml` and create a matching folder of content files (sorted by filename) for each. Each content file must have a few parameters defined in the header which informs the style (background color), as well as which collection it is part of (slightly redundant). Each collection becomes a top-level menu item and page. Finally, must also then create a file in the root of the project directory (same level as index.html) which has a 'permalink' parameter in its header which matches the collection name, sets up page contents, and may be customized.

### Example

To create an **About** 'SinglePaged' page and include in top menu:
- Define `about` -- including a value for `order` to inform position in menu -- under the `collections` configuration option in `_config.yml`. 
- Create & populate an `_about` folder with content files which have `collection : about` in the header, plus any metadata applicable to the SinglePaged template (title, colors, icon, etc.).
- Create `about.html` in root directory (same level as `index.html`) with the same contents as in `index.html`, swapping out collection to render and page title, and adding `permalink: about` to the header between the 2 3-dash lines. Customize with own layout if needed.

### Other (non-SinglePaged) Pages

If need to create a plain page (not SinglePaged) with own HTML (or Markdown) layout, create it similarly to `about.html` in example but replace contents (perhaps with exception of wrapper-foot.html and wrapper-head.html) with own markup. (Not final:) Modify `_includes/top-nav.html` manually to add new page as a menu item, or create a dummy 'collection' for it in `_config.yml`.
