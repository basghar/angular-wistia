(function wistiaPlayerDirectiveIIFE() {
    'use strict';

    function createWistiaPlayerDirective(WistiaAPI) {

        function getWistiaAsyncClassName(hashedId) {
            return 'wistia_async_' + hashedId;
        }

        function removeEmbed(Wistia, containerElement, hashedId, wistiaPlayer) {
            var wistiaEmbedElement = containerElement.find('.' + getWistiaAsyncClassName(hashedId));

            wistiaPlayer = wistiaPlayer || Wistia.api(hashedId);

            if (wistiaPlayer) {
                wistiaPlayer.remove();
            }
            wistiaEmbedElement.remove();
        }

        function addEmbed(Wistia, containerElement, hashedId) {
            var wistiaEmbedElement = angular.element(
                '<div class="wistia_embed ' + getWistiaAsyncClassName(hashedId) + '"></div>'
            );

            containerElement.append(wistiaEmbedElement);

            Wistia.embeds.setup();
            return Wistia.api(hashedId);
        }

        return {
            restrict: 'A',
            scope: {
                srcHashedId: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('srcHashedId', function (srcHashedId, oldHash) {
                    WistiaAPI.then(function initializeEmbed(Wistia) {
                        var wistiaPlayer;

                        if (oldHash) {
                            wistiaPlayer = Wistia.api(oldHash);
                        }

                        if (srcHashedId) {
                            if (wistiaPlayer) {
                                wistiaPlayer.replaceWith(srcHashedId);
                            } else {
                                wistiaPlayer = addEmbed(Wistia, element, srcHashedId);
                            }

                            if (scope.$eval(attrs.autoPlay) === true) {
                                wistiaPlayer.play();
                            }
                        } else {
                            removeEmbed(Wistia, element, oldHash, wistiaPlayer);
                        }
                    });
                });

                scope.$on('$destroy', function cleanUp() {
                    if (scope.srcHashedId) {
                        WistiaAPI.then(function cleanUpEmbed(Wistia) {
                            removeEmbed(Wistia, element, scope.srcHashedId);
                        });
                    }
                });
            }
        };
    }

    angular.module('angular-wistia').directive('wistiaPlayer', createWistiaPlayerDirective);
})();
