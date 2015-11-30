(function iife() {
    'use strict';

    function WistiaDataPageController(wistiaData) {
        var vm = this,
            MediaResource = wistiaData.MediaResource;

        vm.medias = MediaResource.query();

    }

    angular
        .module('angular-wistia-pages')
        .controller('WistiaDataPageCtrl', WistiaDataPageController);

})();
