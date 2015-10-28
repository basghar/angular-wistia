describe('wistia-service', function () {

    var $httpBackend, itemId = 'itemId1234';

    beforeEach(module('angular-wistia'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    var mediaList = [{
        id: 1,
        name: "dummy.jpg",
        hashed_id: 'shitty_hash1'
    }];


    xit('should invoke Medias#list with .json appended correctly', inject(function (wistiaService, wistiaConstants) {
        var result;

        $httpBackend.expectGET(wistiaConstants.dataUrl + '/medias.json?' +
            'api_password=' + wistiaConstants.apiPassword +
            '&project_id=' + itemId)
            .respond(200, mediaList);

        wistiaService.getAttachments(itemId, function onSuccess(attachments) {
            // need to remove Resource methods for comparison
            result = _.map(attachments, function (a) {
                return _.pick(a, _.keys(mediaList[0]));
            });
        });

        waitsFor(function () {
            return result;
        });

        runs(function () {
            expect(result).toEqual(mediaList);
        });

        $httpBackend.flush();
    }));

    it('should invoke Medias#show with .json appended correctly', inject(function (wistiaService, wistiaConstants) {
        var result,
            mediaHashId = mediaList[0].hashed_id;

        //TODO: investigate why search is performed rather than simple resource get request

        $httpBackend.expectGET(wistiaConstants.dataUrl + '/medias/' + mediaHashId + '.json?' +
            'api_password=' + wistiaConstants.apiPassword)
            .respond(200, mediaList[0]);

        wistiaService.getAttachment(mediaHashId, function onSuccess(attachment) {
            // need to remove Resource methods for comparison
            result = _.pick(attachment, _.keys(mediaList[0]));
        });

        $httpBackend.flush();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

});
