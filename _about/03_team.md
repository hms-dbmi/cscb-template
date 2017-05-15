---
title: "Team"
bg: brightblue
color: white
collection : about
fa-icon: users
---

<div class="team-member-blocks lab-members column full clearfix xs-margin-top xs-margin-bottom">
{% for lab in site.member_labs %}
    <div class="team-member-block lab-member-block">
        <div class="inner clearfix">
            <div class="detail">
                {% if lab.link %}
                <h4 class="name">
                    <a href="{{ lab.link }}" target="_blank" title="Go to {{ lab.link }}">{{ lab.name }}</a>
                </h4>
                {% else %}
                <h4 class="name">{{ lab.name }}</h3>
                {% endif %}
                <ul class="xs-margin-top">
                    {% if lab.email %}
                    <li class="email">
                        <i class="fa fa-fw fa-envelope"></i>&nbsp; <a href="mailto:{{lab.email}}" target="_blank">{{ lab.email }}</a>
                    </li>
                    {% endif %}
                    {% if lab.link %}
                    <li class="website">
                        <i class="fa fa-fw fa-globe"></i>&nbsp; <a href="{{lab.link}}" target="_blank">{{ lab.link }}</a>
                    </li>
                    {% endif %}
                    {% if lab.twitter %}
                    <li class="twitter">
                        <i class="fa fa-fw fa-twitter"></i>&nbsp; @<a href="https://twitter.com/{{lab.twitter}}" target="_blank">{{ lab.twitter }}</a>
                    </li>
                    {% endif %}
                    {% if lab.more_info %}
                    <li>{{ lab.more_info }}</li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </div>
{% endfor %}
</div>

<p class="center">
For more information about our team, visit the <a href="stem-cell-commons">Stem Cell Commons</a>, <a href="consulting">Consulting</a> and <a href="training">Training</a> pages.
</p>


<script>
    (function($){
        $(".team-member-blocks").equalizer();
    })(jQuery);
</script>
