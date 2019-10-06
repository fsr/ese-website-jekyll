(function() {
  var success;

  success = function() {
    return 0;
  };

  document.addEventListener('DOMContentLoaded', function() {
    return new Konami(success);
  });

}).call(this);
