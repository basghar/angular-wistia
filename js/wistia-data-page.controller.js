(function iife() {
    'use strict';

    function WistiaDataPageController(wistiaData) {
        var vm = this,
            MediaResource = wistiaData.MediaResource,
            ProjectResource = wistiaData.ProjectResource;

        vm.medias = MediaResource.query();
        vm.projects = ProjectResource.query();
    }

    angular
        .module('angular-wistia-pages')
        .controller('WistiaDataPageCtrl', WistiaDataPageController);

})();
