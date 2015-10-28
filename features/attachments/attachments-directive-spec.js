describe('attachmentsDirective', function () {

    beforeEach(module('angular-wistia'));
    beforeEach(module('templates'));

    var elm, scope, compile;

    beforeEach(inject(function ($rootScope, $compile, wistiaConstants) {
        scope = $rootScope.$new();
        scope.itemId = 'test_id';
        scope.uploadOptions = wistiaConstants.uploadOptions;

        compile = $compile;
        elm = angular.element('<div aw-attachments owner-id="{{itemId}}" upload-options="uploadOptions"></div>');

        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should ...', function () {
    });
});
