describe('playerDirective', function () {

    var elm, scope, wistiaApiMock,
        media = {
            id: 1,
            name: "dummy.jpg",
            hashed_id: 'shitty_hash1'
        };

    beforeEach(module('angular-wistia', function($provide){
        //TODO: what the heck? mocking promise :(

        wistiaApiMock = {
            api: jasmine.createSpy('api'),
            embeds: jasmine.createSpyObj('embeds', ['setup'])
        };

        $provide.value('WistiaAPI', {
            then: function(cb){
                cb(wistiaApiMock);
            }
        });
    }));

    beforeEach(inject(function ($q, $rootScope, $compile) {
        scope = $rootScope.$new();
        scope.media = media;

        elm = angular.element('<div wistia-player src-hashed-id="media.hashed_id"></div>');

        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should append media embed container and get wistia to initialize', function () {
        expect(elm.find('.wistia_async_' + media.hashed_id).length).toBe(1);
        expect(wistiaApiMock.embeds.setup).toHaveBeenCalled();
    });

    it('should remove media embed container and get wistia to cleanup', function () {
        var wistiaPlayerMock = jasmine.createSpyObj('media', ['remove']);

        wistiaApiMock.api.and.returnValue(wistiaPlayerMock);
        delete scope.media;
        scope.$digest();
        expect(elm.find('.wistia_async_' + media.hashed_id).length).toBe(0);
        expect(wistiaPlayerMock.remove).toHaveBeenCalled();
    });

    it('should replace media embed container', function () {
        var wistiaPlayerMock = jasmine.createSpyObj('media', ['replaceWith']);

        wistiaApiMock.api.and.returnValue(wistiaPlayerMock);
        media.hashed_id = 'oh-another-shitty-hash';
        scope.$digest();
        expect(wistiaPlayerMock.replaceWith).toHaveBeenCalled();
    });
});
