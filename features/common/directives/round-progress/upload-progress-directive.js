(function uploadProgressDirectiveIIFE() {
    'use strict';

    function UploadProgressController($interpolate) {
        var createRadialStyle = $interpolate(
            'linear-gradient({{ia}}deg, {{iac}} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)),' +
            'linear-gradient({{ib}}deg, #656D74 50%, #E4E4E5 50%, #E4E4E5)'
        );

        this.getRadialProgressStyle = function getRadialProgressStyle() {
            var progress = this.progress;

            //TODO: find out a better way to do this.
            return createRadialStyle({
                ia: progress < 50 ? 90 : progress * 3.6 - 270,
                iac: progress < 50 ? '#E4E4E5' : '#656D74',
                ib: progress >= 50 ? 270 : progress * 3.6 + 90
            });
        };
    }

    function createUploadProgressDirective() {
        return {
            replace: true,
            scope: {
                progress: '=awProgress'
                //TODO: create params for style colors
            },
            templateUrl: 'features/common/directives/round-progress/upload-progress-directive.html',
            controller: 'UploadProgressDirectiveCtrl',
            controllerAs: 'vm', //viewModel
            bindToController: true
        };
    }

    angular.module('angular-wistia')
        .controller('UploadProgressDirectiveCtrl', UploadProgressController)
        .directive('awUploadProgress', createUploadProgressDirective);
})();

