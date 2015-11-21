(function iife() {
    'use strict';

    function MainController($scope, $timeout, $mdSidenav, SECTIONS) {
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

        angular.extend(menu, {
            sections: SECTIONS,

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
