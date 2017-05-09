---
title: "Program"
bg: brightblue
color: white
collection : training

courses:
  - date: April 3-4, 2017
    title: Introduction to R
    lab: HSCI, HMS, HNDC
  - date: March 6-7, 2017
    title: Introduction to UNIX and Orchestra with HMS-RC
    lab: HSCI
  - date: May 31-July 7, 2017
    title: In-depth NGS Analysis Course
    lab: HSCI, HMS, HNDC
    highlighted: true

---

# Bioinformatics Training Program
{:.big-margin-bottom}

We provide bioinformatics training through short workshops and in-depth courses.

1. Workshops

*Next Generation Sequencing Introduction Series:*

Workshops on RNA-seq, ChIP-seq to introduce basic concepts of Next-Generation Sequencing (NGS) analysis. The goal of these workshops are to enable researchers to design their studies appropriately and perform preliminary data analyses.

*Basic Bioinformatics Skills Series:*

Topics include R, data visualization using R, Python programming, Unix and high-performance computing (duration varies from half a day to three days).

2. In-Depth Next Generation Sequencing Analysis Courses

These intensive courses run for 10-12 days and are aimed at bench biologists interested in learning how to perform NGS data analysis independently using best practices. Topics covered in this course include:

UNIX & High-Performance Computing (Orchestra with HMS-RC)
NGS data analysis (RNA-seq, ChIP-seq, Variant calling)
Statistical analysis using R
Functional analysis downstream of sequence analysis

*No prior NGS or command line expertise is required for our workshops or courses unless explicitly stated.*

<table class="no-margin-bottom">
    <thead>
        <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Lab</th>
        </tr>
    </thead>
    <tbody>
    {% for course in page.courses %}
    <tr{% if course.highlighted == true %} class="highlighted"{% endif %}>
        <td class="date">{{ course.date }}</td>
        <td class="title">{{ course.title }}</td>
        <td class="lab">{{ course.lab }}</td>
    </tr>
    {% endfor %}
    </tbody>
</table>


All teaching materials are available online on [Github](https://github.com/hbctraining).
