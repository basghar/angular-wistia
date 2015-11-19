(function iife() {
    'use strict';

    function MainController($scope, $timeout, $mdSidenav) {
        var vm = this;

        vm.openMenu = function openMenu() {
            $timeout(function () {
                $mdSidenav('left').open();
            });
        };

        $scope.menu = {
            sections: [{
                name: 'API Reference',
                type: 'heading',
                children: [{
                    name: 'Directives',
                    type: 'toggle',
                    pages: [{
                        name: 'wistia-player',
                        id: 'wistiaPlayer',
                        url: 'directives/player'
                    }, {
                        name: 'wistia-media',
                        id: 'wistiaMedia',
                        url: 'directives/media'
                    }]
                }, {
                    name: 'Services',
                    type: 'toggle',
                    pages: [{
                        name: 'wistiaData',
                        id: 'wistiaData',
                        url: 'services/data'
                    }, {
                        name: 'wistiaStats',
                        id: 'wistiaStats',
                        url: 'services/stats'
                    }]
                }]
            }]
        };

    }

    angular
        .module('angular-wistia-pages')
        .controller('MainCtrl', MainController);
})();
