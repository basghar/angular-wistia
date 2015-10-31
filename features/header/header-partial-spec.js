describe('HeaderCtrl', function() {

	beforeEach(module('angular-wistia'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('HeaderCtrl', {$scope: scope});
    }));

	it('should do ....', function() {
	});

});
