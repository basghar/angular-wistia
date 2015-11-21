(function iife() {
    'use strict';

    function findLinkAndAddRoute(menuNode, $routeProvider) {
        angular.forEach(menuNode, function checkChildNode(childMenuNode) {
            var routeUrl;

            if (childMenuNode.url) {
                routeUrl = childMenuNode.url;
                if (routeUrl.slice(0, 1) === '#') {
                    routeUrl = routeUrl.substr(1);
                }

                $routeProvider.when(routeUrl, {
                    templateUrl: childMenuNode.templateUrl
                });
            } else if (angular.isObject(childMenuNode)) {
                findLinkAndAddRoute(childMenuNode, $routeProvider);
            }
        });
    }

    angular
        .module('angular-wistia-pages', ['ngMaterial', 'ngRoute', 'ngResource'])
        .controller('TestCtrl', function () {
            console.log('?????????????????????????????????????????');
        })
        .config(function ($routeProvider, $locationProvider, SECTIONS) {
            //$locationProvider.html5Mode(true);

            findLinkAndAddRoute(SECTIONS, $routeProvider);
        })
        .constant('SECTIONS', [{
            name: 'API Reference',
            type: 'heading',
            children: [{
                name: 'Directives',
                type: 'toggle',
                pages: [{
                    name: 'wistia-player',
                    id: 'wistiaPlayer',
                    url: '#/directives/player',
                    templateUrl: 'partials/wistia-player.tmpl.html'
                }, {
                    name: 'wistia-media',
                    id: 'wistiaMedia',
                    url: '#/directives/media',
                    templateUrl: 'partials/wistia-media.tmpl.html'
                }]
            }, {
                name: 'Services',
                type: 'toggle',
                pages: [{
                    name: 'wistiaData',
                    id: 'wistiaData',
                    url: '#services/data',
                    templateUrl: 'partials/wistia-data.tmpl.html'
                }, {
                    name: 'wistiaStats',
                    id: 'wistiaStats',
                    url: '#services/stats',
                    templateUrl: 'partials/wistia-stats.tmpl.html'
                }]
            }]
        }]);
})();