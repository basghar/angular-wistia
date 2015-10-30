//TODO: isolate directive tests from directive, but as of now directive is nothing much to test

describe('attachmentsDirective', function () {

    beforeEach(module('angular-wistia'));
    beforeEach(module('templates'));

    var elm, scope, rootScope, compile, _wistiaService, mediaList;

    function createResourceList(mediaList, wistiaService){
        var resourceList = [];
        mediaList.forEach(function(media){
            resourceList.push(wistiaService.createResource(media));
        });
        return resourceList;
    }

    beforeEach(inject(function ($rootScope, $compile, wistiaConstants, wistiaService) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        scope.itemId = 'test_id';
        scope.uploadOptions = wistiaConstants.uploadOptions;

        compile = $compile;
        elm = angular.element('<div aw-attachments owner-id="{{itemId}}" ' +
            'viewer="showVideoPlayer(media) "upload-options="uploadOptions"></div>');

        $compile(elm)(scope);
        _wistiaService = wistiaService;
        mediaList = createResourceList([{
            id: 1,
            name: "dummy.jpg",
            hashed_id: 'shitty_hash1'
        }], _wistiaService);
        spyOn(_wistiaService, 'getAttachments').and.returnValue(mediaList);
        scope.$digest();
    }));

    it('should load wistia media in the start utilizing wistiaService', function () {
        var isolatedScope = elm.isolateScope();
        expect(_wistiaService.getAttachments).toHaveBeenCalledWith(scope.itemId);
        expect(isolatedScope.attachments).toBe(mediaList);
    });

    it('should facilitate toggling the attachment panel', function () {
        var isolatedScope = elm.isolateScope();
        expect(isolatedScope.collapsed).toBe(true);
        isolatedScope.toggleCollapse();
        expect(isolatedScope.collapsed).toBe(false);
        isolatedScope.toggleCollapse();
        expect(isolatedScope.collapsed).toBe(true);
    });

    it('should remove attachment', function () {
        var existingMedia = mediaList[0],
            isolatedScope = elm.isolateScope();
        expect(isolatedScope.attachments.length).toBe(1);
        spyOn(existingMedia, '$delete').and.callFake(function(onDeleteSuccess){
            onDeleteSuccess();
        });
        isolatedScope.removeAttachment(existingMedia);
        expect(isolatedScope.attachments.length).toBe(0);
    });

    it('should add attachment', function () {
        var data,
            isolatedScope = elm.isolateScope();

        scope.clear = jasmine.createSpy();
        data =  {
            result: {
                id: 2,
                name: "uploaded_dummy.jpg",
                hashed_id: 'uploaded_shitty_hash1'
            },
            files: [],
            scope: scope
        };

        expect(isolatedScope.attachments.length).toBe(1);
        rootScope.$emit('fileuploaddone', data);
        expect(scope.clear).toHaveBeenCalledWith(data.files);
        expect(isolatedScope.attachments.length).toBe(2);
    });

});
