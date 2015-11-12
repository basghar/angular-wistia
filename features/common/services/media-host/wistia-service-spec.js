describe('wistia-service', function () {

    var $httpBackend,
        wistiaService,
        wistiaConstants,
        itemId = 'itemId1234',
        mediaList = [{
            id: 1,
            name: "dummy.jpg",
            hashed_id: 'shitty_hash1'
        }];

    beforeEach(module('angular-wistia'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(inject(function (_wistiaService_, _wistiaConstants_) {
        wistiaService = _wistiaService_;
        wistiaConstants =_wistiaConstants_;
    }));


    it('should invoke Medias#list with .json appended correctly', function () {
        $httpBackend.expectGET(wistiaConstants.dataUrl + '/medias.json?' +
            'api_password=' + wistiaConstants.apiPassword +
            '&page=1&per_page=10' +
            '&project_id=' + itemId +
            '&sort_direction=1')
            .respond(200, mediaList);

        wistiaService.getAttachments(itemId, function onSuccess(attachments) {
            // need to remove Resource methods for comparison
            var result = _.map(attachments, function (a) {
                return _.pick(a, _.keys(mediaList[0]));
            });
            expect(result).toEqual(mediaList);
        });

        $httpBackend.flush();
    });

    it('should invoke Medias#show with .json appended correctly', function () {
        var mediaHashId = mediaList[0].hashed_id;

        $httpBackend.expectGET(wistiaConstants.dataUrl + '/medias/' + mediaHashId + '.json?' +
            'api_password=' + wistiaConstants.apiPassword)
            .respond(200, mediaList[0]);

        wistiaService.getAttachment(mediaHashId, function onSuccess(attachment) {
            // need to remove Resource methods for comparison
            var result = _.pick(attachment, _.keys(mediaList[0]));
            expect(result).toEqual(mediaList[0]);
        });

        $httpBackend.flush();
    });

    it('should invoke Medias#update and #delete', function () {
        var mediaHashId = mediaList[0].hashed_id;

        $httpBackend.expectGET(wistiaConstants.dataUrl + '/medias/' + mediaHashId + '.json?' +
            'api_password=' + wistiaConstants.apiPassword)
            .respond(200, mediaList[0]);

        $httpBackend.expectPUT(wistiaConstants.dataUrl + '/medias/' + mediaHashId + '.json?' +
            'api_password=' + wistiaConstants.apiPassword)
            .respond(200, mediaList[0]);

        $httpBackend.expectDELETE(wistiaConstants.dataUrl + '/medias/' + mediaHashId + '.json?' +
            'api_password=' + wistiaConstants.apiPassword)
            .respond(200);

        wistiaService.MediaResource.get({mediaHashedId: mediaHashId}, function onSuccess(media) {
            media.$save();
            media.$delete();
        });



        $httpBackend.flush();
    });


    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

});
