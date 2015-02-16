/*jshint strict:false, browser:true */

window.onload = function(){
  var bookmarkletBanner = document.getElementById('bookmarklet-explain');
  var bookmarkletButton = document.getElementById('bookmarklet-button');

  bookmarkletButton.addEventListener('mouseover', function() {
    bookmarkletBanner.className += 'active';
  });
  bookmarkletButton.addEventListener('mouseout', function() {
    bookmarkletBanner.className = bookmarkletBanner.className.replace( /(?:^|\s)active(?!\S)/g , '' );
  });	
};