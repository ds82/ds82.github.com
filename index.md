---
layout: default
---
{% include JB/setup %}

<div class="blog-index">
  {% assign index = true %}
  {% for post in site.posts %}
  
    <article>
      {% include themes/twitter_v3/article.html %}
    </article>
  {% endfor %}
  <div class="pagination">
    {% if paginator.next_page %}
      <a class="prev" href="{{paginator.next_page}}">&larr; Older</a>
    {% endif %}
    <!-- <a href="archives">Blog Archives</a> -->
    {% if paginator.previous_page %}
    <a class="next" href="{{paginator.previous_page}}">Newer &rarr;</a>
    {% endif %}
  </div>
</div> 