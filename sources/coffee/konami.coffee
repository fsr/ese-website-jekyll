---
---

success = ->
  return 0

document.addEventListener 'DOMContentLoaded', ->
  new Konami(success)
