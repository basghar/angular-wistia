(function iife() {
    'use strict';

    function MainController($scope, $timeout, $mdSidenav) {
        var menu = {},
            vm = this;

        vm.openMenu = function openMenu() {
            $timeout(function () {
                $mdSidenav('left').open();
            });
        };

        vm.isSelected = function isSelected(page) {
            return menu.isPageSelected(page);
        };

        vm.isOpen = function isOpen(section) {
            return menu.isSectionSelected(section);
        };

        vm.toggleOpen = function toggleOpen(section) {
            menu.toggleSelectSection(section);
        };

        menu.sections = [{
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
        }];

        angular.extend(menu, {
            selectSection: function (section) {
                self.openedSection = section;
            },
            toggleSelectSection: function (section) {
                self.openedSection = (self.openedSection === section ? null : section);
            },
            isSectionSelected: function (section) {
                return self.openedSection === section;
            },

            selectPage: function (section, page) {
                self.currentSection = section;
                self.currentPage = page;
            },
            isPageSelected: function (page) {
                return self.currentPage === page;
            }
        });

        $scope.menu = menu;
    }

    angular
        .module('angular-wistia-pages')
        .controller('MainCtrl', MainController);
})();
