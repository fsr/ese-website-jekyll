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
    console.log('hello')

  toggle: ->
    @hide = not @hide

    for item in @items
      if @hide
        item.classList.add 'hidden'
      else
        item.classList.remove 'hidden'

    for button in @buttons
      button.innerHTML = if @hide then 'mehr' else 'weniger'


document.addEventListener 'DOMContentLoaded', ->
  new NewsInteractions()
