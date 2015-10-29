(function awAttachmentsControllerIIFE() {
    'use strict';

    angular.module('angular-wistia').directive('awAsyncClick', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var clickFn = $parse(attrs['awAsyncClick']),
                    iconElement = angular.element('i.fa-action-icon'),
                    progressStyleClasses = (attrs.progressClass || 'fa-spinner') + ' fa-spin fa-disabled';

                element.on('click', function onClick(event) {
                    event.stopPropagation();
                    var promise = clickFn(scope, {$event: event});
                    promise = (promise && promise.$promise) ? promise.$promise : promise; // can be resource object
                    if (promise) {
                        iconElement.addClass(progressStyleClasses);
                        promise.finally(function removeProgressIndicator() {
                            iconElement.removeClass(progressStyleClasses);
                        });
                    }
                });
            }
        };
    });
})();
