---
---

class SwitchHeader
  headers: [
    {% for header in site.data.switchheader.headers %}
      "{{ header }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]

  count: 0

  constructor: ->

    @switches = document.getElementsByClassName 'toggle-header'

    for _switch in @switches
      _switch.addEventListener "click", => @toggle()

  toggle: ->
    @count = (@count + 1) % @headers.length

    document.getElementById("header").style.backgroundImage = "url({{ site.baseurl }}img/header/" + @headers[@count] + ")";


document.addEventListener "DOMContentLoaded", ->
  new SwitchHeader()
