(function wistiaConstantsIIFE() {

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
