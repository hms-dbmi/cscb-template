---
title: "Program"
bg: green
color: white
collection : training

courses:
  - date: Nov 4, 2015
    title: Single Cell RNA-Seq Workshop with Peter Kharchenko
    lab: HSCI
  - date: Nov 13, 2015
    title: RNA-Seq (Galaxy-based)
    lab: HSCI
  - date: Oct 20, 2016
    title: Differential Gene Expression Workshop
    lab: HMS, HNDC, HSCI
    highlighted: true
---

# Bioinformatics Training Program
{:.big-margin-bottom}

- 110 registered students
- 56 hours for workshops <small>(7 hours/day, 8 days total)</small>
- 168 hours for long courses <small>(7 hours/day, 24 days total) + ~22 office hours</small>

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