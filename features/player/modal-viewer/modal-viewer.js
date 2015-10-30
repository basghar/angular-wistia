// wrap into iife if more functionality is added
// migrate to controller as
angular.module('angular-wistia').controller('WistiaModalViewerCtrl', function ($scope, media) {
    $scope.media = media;
});
