(function wistiaServiceIIFE() {

    function wistiaServiceFactory($resource, wistiaConstants) {

        var WistiaMedia = $resource(wistiaConstants.dataUrl + '/medias/:mediaHashedId/', {
                mediaHashedId: '@hashed_id',
                api_password: wistiaConstants.apiPassword
            }),
            wistiaService = {
                createResource: function (attachment){
                    return new WistiaMedia(attachment);
                },

                getAttachment: function getAttachment(id, success, error) {
                    return WistiaMedia.get({hashed_id: id}, success, error);
                },

                getAttachments: function getAttachments(ownerId, success, error) {
                    return WistiaMedia.query({project_id: ownerId}, success, error);
                }
            };

        return wistiaService;
    }

    function wistiaServiceInterceptorFactory(wistiaConstants) {
        var jsonExtAppendor = {
            request: function interceptRequest(config) {
                if (config.url.indexOf(wistiaConstants.dataUrl) === 0) {
                    config.url = config.url + '.json';
                }
                return config;
            }
        };

        return jsonExtAppendor;
    }

    angular.module('angularWistia')
        .factory('wistiaService', wistiaServiceFactory)
        .factory('wistiaServiceInterceptor', wistiaServiceInterceptorFactory)
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('wistiaServiceInterceptor');
        }]);
})();
