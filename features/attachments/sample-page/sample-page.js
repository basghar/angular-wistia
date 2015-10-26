(function attachmentsSamplePageIIFE() {

    attachmentsSamplePageCtrl.$inject = ['$scope', 'wistiaConstants'];
    function attachmentsSamplePageCtrl($scope, wistiaConstants) {
        // we are using wistia project id as item id to filter the media to retrieve media only related to given item.
        $scope.itemId = 'dw51s64qz7';
        $scope.uploadOptions = wistiaConstants.uploadOptions;
    }

    angular.module('angularWistia').controller('AttachmentsSamplePageCtrl', attachmentsSamplePageCtrl);
})();
