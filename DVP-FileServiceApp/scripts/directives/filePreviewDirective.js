/**
 * Created by Rajinda on 5/26/2016.
 */

var app = angular.module("FileManageApp");

app.directive("myDirective", function ($filter) {

  return {
    restrict: "EA",
    scope: {
      name: "@",
      heroes: '=data'
    },

    template: '<video autoplay="autoplay" id="my-video" class="video-js" controls  width="200" height="100"> <source src="sources" type=\'video/mp4\'><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>  </p>  </video>'



  }
});
