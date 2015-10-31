describe('AttachmentsSamplePageCtrl', function () {

    beforeEach(module('angular-wistia'));

    var scope, ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('AttachmentsSamplePageCtrl', {$scope: scope});
    }));

    it('should initialize correctly', function () {
        expect(scope.itemId).toBeDefined();
        expect(scope.uploadOptions).toBeDefined();
    });

});
