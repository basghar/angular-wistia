(function iife() {
    'use strict';

    function WistiaDataPageController(wistiaData) {
        var menu = {},
            vm = this,
            MediaResource = wistiaData.MediaResource;

        vm.medias = MediaResource.query({}, function (medias) {
            console.log('=================', medias);
        });

    }

    angular
        .module('angular-wistia-pages')
        .controller('WistiaDataPageCtrl', WistiaDataPageController);

})();
