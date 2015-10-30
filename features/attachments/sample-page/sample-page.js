(function attachmentsSamplePageIIFE() {

    //TODO: convert to 'controller as'
    function attachmentsSamplePageCtrl($scope, $uibModal, wistiaConstants) {
        // we are using wistia project id as item id to filter the media to retrieve media only related to given item.
        $scope.itemId = 'dw51s64qz7';
        $scope.uploadOptions = wistiaConstants.uploadOptions;

        $scope.showVideoPlayer = function showVideoPlayer(media){
            var modalInstance = $uibModal.open({
                templateUrl: 'features/player/modal-viewer/modal-viewer.html',
                controller: 'WistiaModalViewerCtrl',
                size: 'lg',
                resolve: {
                    media: media
                }
            });
        };
    }

    angular.module('angular-wistia').controller('AttachmentsSamplePageCtrl', attachmentsSamplePageCtrl);
})();
