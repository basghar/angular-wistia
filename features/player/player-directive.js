(function wistiaPlayerDirectiveIIFE() {
    'use strict';

    function createWistiaPlayerDirective(WistiaAPI) {

        function getWistiaAsyncClassName(hashedId) {
            return 'wistia_async_' + hashedId;
        }

        function removeEmbed(Wistia, hashedId, container) {
            var video = Wistia.api(hashedId),
                wistiaEmbedElement = container.find('.' + getWistiaAsyncClassName(hashedId));

            if (video) {
                video.remove();
            }
            wistiaEmbedElement.remove();
        }

        return {
            restrict: 'A',
            scope: {
                srcHashedId: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('srcHashedId', function (srcHashedId, oldHash) {
                    WistiaAPI.then(function initializeEmbed(Wistia) {
                        var wistiaEmbedElement;

                        if (oldHash && oldHash !== srcHashedId) {
                            removeEmbed(Wistia, oldHash, element);
                        }

                        if (srcHashedId) {
                            wistiaEmbedElement = angular.element(
                                '<div class="wistia_embed ' + getWistiaAsyncClassName(srcHashedId)+ '"></div>'
                            );

                            element.append(wistiaEmbedElement);
                            Wistia.embeds.setup();
                            if(scope.$eval(attrs.autoPlay) === true){
                                Wistia.api(srcHashedId).play();
                            }
                        }
                    });
                });

                scope.$on('$destroy', function cleanUp() {
                    if (scope.srcHashedId) {
                        WistiaAPI.then(function cleanUpEmbed(Wistia) {
                            removeEmbed(Wistia, scope.srcHashedId, element);
                        });
                    }
                });
            }
        };
    }

    angular.module('angular-wistia').directive('wistiaPlayer', createWistiaPlayerDirective);
})();
