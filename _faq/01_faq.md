---
title: "FAQ"
bg: darkblue
color: white
collection : faq
---

# FAQ

## Metadata
{:.left}

#### Should I provide tabular or ISA-Tab metadata?
{:.left}

Tabular metadata are simpler to prepare, while ISA-Tab has the added benefit of being able to note relationships between raw and processed files.

#### How do I create an ISA-Tab archive?
{:.left}

The simplest way is via this [Google Sheet template][isa-google-sheet], following these instructions:
1) Fill out all 3 sheets
2) Download each sheet as tab-separated values, naming the investigation, study, and assay sheets as _i\_<study\_identifier>.txt_, _s\_<study\_identifier>.txt_, and _a\_<study\_identifier>.txt_, respectively
3) Compress the 3 .txt files as a .zip archive

Alternatively, if you prefer to have access to the full functionality of ISA-Tab, download the latest version of [ISAcreator][isa-creator-releases] and follow along with this [video tutorial][isa-creator-video] to create an ISA-Tab archive.
<br><br>

## Data Set Upload
{:.left}

#### How do I get my data into the Stem Cell Commons?
{:.left}

You have 3 options:
* _Option 1:_ Upload your data files alongside tabular metadata (e.g. txt, csv). Sample name, filename, and organism fields are required — the remaining fields are up to you.
* _Option 2:_ Upload your data files alongside 3-tier ISA-Tab metadata — the benefit of this option is that file relationships can be indicated. A Google Sheet-based ISA-Tab template is available [here][isa-google-sheet].
* _Option 3:_ Directly upload remote files via the AWS Command Line Interface. This option is available after providing either tabular or ISA-Tab metadata through the browser.
<br><br>

## Collaboration
{:.left}

#### How do I share my data with another user?
{:.left}

As data set owner, you are able to share a data set, via the **Data Sets** card on My Dashboard, with a new or existing group. If the other user does not already belong to that group, invite him/her using the neighboring **Collaboration** card.

[isa-google-sheet]: https://docs.google.com/spreadsheets/d/1AUg5TkfxTSYu0jHuAxOXTVKILlOfHiWUt2Xolb-vCds/edit?usp=sharing
[isa-creator-releases]: https://github.com/ISA-tools/ISAcreator/releases
[isa-creator-video]: https://www.youtube.com/watch?v=abIEtSUrJNY
