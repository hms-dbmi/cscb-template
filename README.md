MultiPage SinglePaged Template
===============================

This project builds on the [SinglePaged Jekyll template](https://github.com/t413/SinglePaged) created by [Tim O'Brien](http://t413.com/).
It is created for the Center for Stem Cell Bioinformatics and may be re-used and adapted for own purposes.

## Usage

Instead of all content being located in the `_posts` directory and sorted & rendered out in one single page as in the original SinglePaged template, you must define your collections, including relevant metadata fields, in `_config.yml` and create a matching folder of content files (sorted by filename) for each. The name of the collection defined becomes the page's path (URL endpoint). Each content file must have a few parameters defined in the header which informs the style (background color), as well as which collection it is part of (slightly redundant). Each collection becomes a top-level menu item and page. Finally, must also then create a file, preferably but not mandatorily in the `/pages/` directory, which has a `permalink` parameter in its header which matches the collection name and includes this snippet : `{% include full-page-template.html %}`

### Example

To create an **About** 'SinglePaged' page and include in top menu:
- In `_config.yml`, list `about` under the `collections` configuration option in `_config.yml`. Include any relevant metadata parameters such as `color` (for color in top menu), `order` (of which menu item appears in top menu), and `title` (if collection name has spaces, which cannot be used in the label). 
- Create & populate an `_about` folder with content files which have `collection : about` in the header, plus any metadata applicable to the SinglePaged template (title, colors, icon, etc.).
- Create `about.html` in `pages/` directory with the following contents:  

  ```liquid
  ---
  permalink: about
  ---
  {% include full-page-template.html %}
  ```
  If want to use a different layout or template instead of SinglePaged, simply replace the full-page-template include with own markup.


### Other (non-SinglePaged) Pages

If need to create a plain page (not SinglePaged) with own HTML (or Markdown) layout, create it similarly to `about.html` in example above but replace contents (perhaps with exception of wrapper-foot.html and wrapper-head.html) with own markup.

### Posts & News Items

The default `posts` collection is not used for the primary pages/sections and may be used for showing news or blog posts within other page/section templates, e.g. in some section or page content file:
```liquid
{% for post in site.posts %}
  <div class="news-post">
    <h6>Posted on {{ post.date }}</h6>
    {{ post.content }}
  </div>
{% endfor %}
```
