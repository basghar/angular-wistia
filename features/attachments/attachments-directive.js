(function wistiaAttachmentsDirectiveIIFE() {
    'use strict';

    function wistiaAttachmentsDirective(wistiaConstants, wistiaService) {

        return {
            restrict: 'A',
            replace: true,
            scope: {
                options: '=uploadOptions',
                viewer: '&'
            },
            templateUrl: 'features/attachments/attachments-directive.html',
            link: function ($scope, $element, $attrs) {
                var attachments;

                $scope.collapsed = true;
                attachments = $scope.attachments = wistiaService.getAttachments($attrs.ownerId);

                $scope.toggleCollapse = function toggleCollapse() {
                    $scope.collapsed = !$scope.collapsed;
                };

                $scope.getRadialProgressStyle = function getRadialProgressStyle(progress) {
                    //TODO: this is quick workaround, need to comeup with some better way.
                    var ia = progress < 50 ? 90 : progress * 3.6 - 270,
                        iac = progress < 50 ? '#E4E4E5' : '#656D74',
                        ib = progress >= 50 ? 270 : progress * 3.6 + 90;
                    return 'linear-gradient(' + ia + 'deg, ' + iac + ' 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), ' +
                        'linear-gradient(' + ib + 'deg, #656D74 50%, #E4E4E5 50%, #E4E4E5)';
                };

                $scope.triggerViewer = function triggerViewer(media) {
                    $scope.viewer({media:media});
                };

                $scope.removeAttachment = function removeAttachment(attachment) {
                    attachment.$delete(function onDeleteSuccess() {
                        attachments.splice(attachments.indexOf(attachment), 1);
                    });
                };

                $scope.$on('fileuploadadd', function onFileAddedToQueue(e, data) {
                    // get jqueryFileUpload to start upload of the selected file.
                    data.formData = {
                        api_password: wistiaConstants.apiPassword,
                        project_id: $attrs.ownerId // add project id as filter parameter
                    };
                    data.submit();
                });

                $scope.$on('fileuploaddone', function onFileUploadDone(e, data) {
                    var newAttachment = new wistiaService.createResource(data.result);
                    attachments.push(newAttachment);
                    data.scope.clear(data.files);
                });
            }
        };
    }

    angular.module('angularWistia').directive('awAttachments', wistiaAttachmentsDirective);
})();

