(function wistiaServiceIIFE() {

    function createWistiaService($resource, wistiaConstants) {

        var listParams = {
                page: 1,
                per_page: 10,
                sort_direction: 1
            },
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
            wistiaService = {
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

        return wistiaService;
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
        .factory('wistiaService', createWistiaService)
        .factory('wistiaServiceInterceptor', createWistiaServiceInterceptor)
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('wistiaServiceInterceptor');
        }]);
})();
