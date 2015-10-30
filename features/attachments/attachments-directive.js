(function wistiaAttachmentsDirectiveIIFE() {
    'use strict';

    function createAttachmentsController($scope, $rootScope, wistiaConstants, wistiaService) {
        var attachments;

        $scope.collapsed = true;
        attachments = $scope.attachments = wistiaService.getAttachments($scope.ownerId);

        $scope.toggleCollapse = function toggleCollapse() {
            $scope.collapsed = !$scope.collapsed;
        };

        $scope.removeAttachment = function removeAttachment(attachment) {
            return attachment.$delete(function onDeleteSuccess() {
                attachments.splice(attachments.indexOf(attachment), 1);
            });
        };

        // Following event is dispatched by jquery file upload directive
        $rootScope.$on('fileuploadadd', function onFileAddedToQueue(e, data) {
            // get jqueryFileUpload to start upload of the selected file.
            data.formData = {
                api_password: wistiaConstants.apiPassword,
                project_id: $scope.ownerId // add project id as filter parameter
            };
            data.submit();
        });

        // Following event is dispatched by jquery file upload directive
        $rootScope.$on('fileuploaddone', function onFileUploadDone(e, data) {
            var newAttachment = wistiaService.createResource(data.result);
            attachments.push(newAttachment);
            // remove files entries from jquery upload queue
            data.scope.clear(data.files);
        });
    }


    function createWAAttachmentsDirective() {

        return {
            restrict: 'A',
            replace: true,
            scope: {
                options: '=uploadOptions',
                ownerId: '@',
                viewer: '&'
            },
            templateUrl: 'features/attachments/attachments-directive.html',
            controller: 'AWAttachmentsDirectiveCtrl',
            link: function ($scope) {
                $scope.getRadialProgressStyle = function getRadialProgressStyle(progress) {
                    //TODO: this is quick workaround, need to come up with some better way.
                    var ia = progress < 50 ? 90 : progress * 3.6 - 270,
                        iac = progress < 50 ? '#E4E4E5' : '#656D74',
                        ib = progress >= 50 ? 270 : progress * 3.6 + 90;
                    return 'linear-gradient(' + ia + 'deg, ' + iac + ' 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), ' +
                        'linear-gradient(' + ib + 'deg, #656D74 50%, #E4E4E5 50%, #E4E4E5)';
                };

                $scope.triggerViewer = function triggerViewer(media) {
                    $scope.viewer({media: media});
                };

            }
        };
    }

    angular.module('angular-wistia')
        .controller('AWAttachmentsDirectiveCtrl', createAttachmentsController)
        .directive('awAttachments', createWAAttachmentsDirective);
})();

