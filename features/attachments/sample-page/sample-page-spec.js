describe('AttachmentsSamplePageCtrl', function () {

    beforeEach(module('angularWistia'));

    var scope, ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('AttachmentsSamplePageCtrl', {$scope: scope});
    }));

    it('should initialize correctly', inject(function () {
        expect(scope.itemId).toBeDefined();
        expect(scope.uploadOptions).toBeDefined();
    }));

});
