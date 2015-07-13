---
---

class NewsInteractions

  constructor: ->
    @buttons = document.getElementsByClassName 'show-more news'
    @items = document.getElementsByClassName 'news-item additional'

    for button in @buttons
      button.addEventListener 'click', => @toggle()

    @hide = false
    @toggle()

  toggle: ->
    @hide = not @hide

    for item in @items
      item.style.display = if @hide then 'none' else 'block'

    for button in @buttons
      button.innerHTML = if @hide then 'show more' else 'show less'


window.onload = ->
  new NewsInteractions()
