/*jshint strict:false, browser:true */
(function bookmarklet() {
  var url = window.location.href;
  if (url.indexOf('https://magic.import.io') === 0) {
  	window.alert('magic.import.io is already loaded!');
  	return false;
  }
  if (url.indexOf('http://odub.github.io/tawny/') === 0) {
    window.alert('Browse to a target page to use with magic.import.io and try again!');
    return false;
  }
  window.open('https://magic.import.io/?site='+encodeURIComponent(url)+'&utm_source=bm&utm_medium=bm&utm_campaign=bm', '_blank');
}());
