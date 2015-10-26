describe('HeaderCtrl', function() {

	beforeEach(module('angularWistia'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('HeaderCtrl', {$scope: scope});
    }));

	xit('should do ....', inject(function() {
	}));

});
