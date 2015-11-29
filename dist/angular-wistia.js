(function iife() {
    'use strict';

    angular.module('angular-wistia', ['ngResource']);
})();

(function wistiaConstantsIIFE() {

    // For demo only: The config such as one with api key/pwd should be fetched from secure http server
    var API_PWD = '5eae1a573f04f76d8d66049a3c7ae9b4cbfc8710dfaf440b252e6abcde77dd7b',
        wistiaConstants = {
            apiPassword: API_PWD,
            dataUrl: 'https://api.wistia.com/v1',
            uploadOptions: {
                url: 'https://upload.wistia.com/',
                type: 'POST',
                formData: [{
                    name: 'api_password',
                    value: API_PWD
                }]
            }
        };

    angular.module('angular-wistia').constant('wistiaConstants', wistiaConstants);
})();

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

(function wistiaDataServiceIIFE() {

    function createWistiaDataService($resource, wistiaConstants) {

        var listParams = {
                page: 1,
                per_page: 10,
                sort_direction: 1
            },
            ProjectResource = $resource(wistiaConstants.dataUrl + '/projects/:hashedId/', {
                hashedId: '@hashedId',
                api_password: wistiaConstants.apiPassword
            }, {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: listParams
                },
                save: {method: 'PUT'},
                copy: {method: 'POST'}
            }),
            MediaResource = $resource(wistiaConstants.dataUrl + '/medias/:mediaHashedId/', {
                mediaHashedId: '@hashed_id',
                api_password: wistiaConstants.apiPassword
            }, {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: listParams
                },
                save: {method: 'PUT'},
                copy: {method: 'POST'},
                stats: {
                    method: 'GET',
                    url: wistiaConstants.dataUrl + '/medias/:mediaHashedId/stats'
                }
            }),
            wistiaDataService = {
                ProjectResource: ProjectResource,
                MediaResource: MediaResource,
                createResource: function (attachment) {
                    return new MediaResource(attachment);
                },

                getAttachment: function getAttachment(id, success, error) {
                    return MediaResource.get({mediaHashedId: id}, success, error);
                },

                getAttachments: function getAttachments(ownerId, success, error) {
                    return MediaResource.query({project_id: ownerId}, success, error);
                }
            };

        return wistiaDataService;
    }

    function createWistiaServiceInterceptor(wistiaConstants) {
        var wistiaInterceptor = {
            request: function interceptRequest(config) {
                if (config.url.indexOf(wistiaConstants.dataUrl) === 0) {
                    config.url = config.url + '.json';
                }
                return config;
            }
        };

        return wistiaInterceptor;
    }


    function provideWistiaAPIObject($window, $q) {
        var wistiaPromise;

        if (!$window.Wistia) {
            wistiaPromise = $q.defer().promise;
            $window.wistiaInit = function onWistiaAsyncInit(Wistia) {
                wistiaPromise.resolve(Wistia);
                delete $window.wistiaInit;
            };
        } else {
            wistiaPromise = $q.when($window.Wistia);
        }

        return wistiaPromise.then(function disableWistiaDOMWatch(Wistia) {
            // TODO: Wistia claims to use mutation observers to initialize player element but for some reason it wasn't working
            // Initially attempted to change class but it didn't pick up, then started removing and adding the whole element.
            // Even that didn't work until started using Wistia.embeds.setup(). For the time being disabling mutation observers.
            Wistia.embeds.dontWatch();
            return Wistia;
        });
    }

    angular.module('angular-wistia')
        .factory('WistiaAPI', provideWistiaAPIObject) // Wistia api object placed on global ns by wistia js script
        .factory('wistiaData', createWistiaDataService)
        .factory('wistiaServiceInterceptor', createWistiaServiceInterceptor)
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('wistiaServiceInterceptor');
        }]);
})();
