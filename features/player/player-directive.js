(function wistiaPlayerDirectiveIIFE(globalNS) {
    'use strict';

    var Wistia;

    globalNS.wistiaInit = function onWistiaInit(W) {
        Wistia = W;
        Wistia.embeds.dontWatch();
    };

    function removeEmbed(parent, hashedId) {
        var video = Wistia.api(hashedId);
        if (video) {
            video.remove();
        }
        parent.empty();
    }

    function wistiaPlayerDirective() {

        return {
            restrict: 'A',
            scope: {
                srcHashedId: '='
            },
            link: function (scope, element) {
                scope.$watch('srcHashedId', function (srcHashedId, oldHash) {
                    var wistiaEmbed;

                    if (srcHashedId) {

                        if (oldHash) {
                            removeEmbed(element, oldHash);
                        }

                        wistiaEmbed = angular.element(
                            '<div class="wistia_embed wistia_async_' + srcHashedId + '"></div>'
                        );

                        element.append(wistiaEmbed);

                        Wistia.embeds.setup();
                        Wistia.api(srcHashedId).play();
                    }
                });

                scope.$on('$destroy', function cleanUp() {
                    if (scope.srcHashedId) {
                        removeEmbed(element, scope.srcHashedId);
                    }
                });
            }
        };
    }

    angular.module('angularWistia').directive('wistiaPlayer', wistiaPlayerDirective);
})(window);
