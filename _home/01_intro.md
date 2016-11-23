---
title: "home"
bg: bluebrighter
color: white
style: center
collection : home
---

<style>
  /** Custom bg image overlay **/
  #home01_intro {
    background-image: none;
    padding-top: 155px; /* Default for first section on SinglePaged is 140px, add extra since is homepage */
  }
  #home01_intro:before {
    content: ' ';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    position: absolute;
    background-image: url({{ 'img/humanstemcell-web-big-grayscale.jpg' | relative_url }});
    opacity: 0.175;
    background-size: cover;
    background-position: 50% 100%;
  }
</style>

<div class="title-wrap-block left">
  <h4 class="big-margin-bottom margin-minus-left text-400">Harvard Stem Cell Institute <i class="fa fa-angle-right"></i></h4>
  <h3 class="no-margin-bottom">Center for</h3>
  <h1 class="text-600">Stem Cell Bioinformatics</h1>

<!--
<img src="{{ 'img/humanstemcell-web.jpg' | relative_url }}" style="width: 480px; height: 360px;" />
{:.containerized}
-->

<hr class="med-margin extra-wide" />

<h3 class="left no-margin-bottom">Proposal for FY2017</h3>

<h4>Peter J. Park (PI), Shannon Ho Sui, Nils Gehlenborg</h4>

</div>