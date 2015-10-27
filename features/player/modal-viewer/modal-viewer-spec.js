describe('WistiaModalViewerCtrl', function() {

	beforeEach(module('angularWistia'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('WistiaModalViewerCtrl', {$scope: scope, media: null});
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});
