/*jshint strict:false, browser:true */
(function bookmarklet() {
  var url = window.location.href;
  if (url.indexOf('https://magic.import.io') === 0) {
  	window.alert('magic.import.io is already loaded!');
  	return false;
  }
  window.open('https://magic.import.io/?site='+encodeURIComponent(url)+'&utm_source=bm&utm_medium=bm&utm_campaign=oscarbookmarklet', '_blank');
}());
