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
        .module('angular-wistia-pages', ['ngMaterial', 'ngRoute', 'ngResource', 'angular-wistia'])
        .config(function ($routeProvider, $locationProvider, SECTIONS) {
            //$locationProvider.html5Mode(true);

            findLinkAndAddRoute(SECTIONS, $routeProvider);
            $routeProvider
                .when('/introduction', {
                    templateUrl: 'partials/introduction.tmpl.html'
                })
                .when('/services/data', {
                    templateUrl: 'partials/wistia-data.tmpl.html'
                })
                .otherwise({
                    redirectTo: '/introduction'
                })
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
                }, {
                    name: 'wistia-media-list',
                    id: 'wistiaMediaList',
                    url: '#/directives/media-list',
                    templateUrl: 'partials/wistia-media-list.tmpl.html'
                }]
            }, {
                name: 'Services',
                type: 'toggle',
                pages: [{
                    name: 'wistiaAPI',
                    id: 'wistiaAPI',
                    url: '#services/api',
                    templateUrl: 'partials/wistia-api.tmpl.html'
                }, {
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