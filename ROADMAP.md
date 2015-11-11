# Road map

1. **Change directory organization**
Currently it's structured like an app, need to change it to library structure. Moreover separate library module from demo app module.
```
|- demo -- directory containing demo app
|- dist -- directory containing pre-built version of library
|- src  -- directory containing source code
    |- directives -- directory containing wistia directives
    |- services   -- directory containing wistia services
|- test -- directory containing unit tests
```
2. Use wistia- as standard prefix for any directives and allow them to be used as tag name
```html
<wistia-player hashed-id="media.hashed_id">
</wistia-player>
```

3. **Add support for player JS api using wistia-player directive**
I would suggest to divide them in two parts.

    -- functions on player object which are basically getter setters will be separated. An tag attribute on the directive such as state-object will expose following attributes.
    ```
    aspect --               _readOnly_
    duration --             _readOnly_ 
    email --                _readWrite_
    embedded --             _readOnly_ //Note: hasEmbedded callback should be an event, need to discuss
    hasData --              _readOnly_ //Note: hasData callback should be an event, need to discuss
    hashedId --             _readOnly_
    height --               _readWrite_
    name --                 _readOnly_
    percentWatched          _readOnly_
    ready --                _readOnly_ //Note: ready callback should be an event, need to discuss
    secondsWatched --       _readOnly_
    secondsWatchedVector -- _readOnly_
    state --                _readOnly_
    time --                 _readWrite_
    videoHeight --          _readWrite_
    videoWidth --           _readWrite_
    volume --               _readWrite_
    width --                _readWrite_
    ```
    
    Changing the _readOnly_ property of state object on the scope will have no effect but changing _readWrite_ property will call relevant function on player object.

    -- Rest of the functions will be available thru getPlayer(hashedId) function of wistiaPlayers service (See roadmap item #6).

    ```html
    <wistia-player
            hashed-id="media.hashed_id"
            state-object="stateObjectOnScope">
    </wistia-player>

    or

    <div wistia-player="stateObjectOnScope"
            hashed-id="media.hashed_id">
    </div>
    ```


4. Add support for events to wistia-player directive.
    - either by tag attributes like on-pause, on-play. It will support expression evaluating to a function call on controller.
    - or by single enable-events attribute that will take array and will dispatch events on scope.

    ```html
    <wistia-player
            hashed-id="media.hashed_id"
            on-play="vm.onPlay(mediaStateObject)" <!--mediaStateObject is used to identify media-->
            on-conversion="vm.onConversion(mediaStateObject, eventParams)">
    </wistia-player>

    or

    <wistia-player
            hashed-id="media.hashed_id"
            enable-events="['play', 'conversion']">
    </wistia-player>
    ```

5. Add support for all options specified at http://wistia.com/doc/player-api#options to wistia-player directive.
To do this an attribute options will be provided that will read an options object from the scope.

    ```html
    <wistia-player
            hashed-id="media.hashed_id"
            options="optionsOnScope">
    </wistia-player>
    ```

6. **Create Angular services using angular $resource for REST API**

    #### wistiaAPI *service following function*
    ```
    getPlayer(hashedId) -- function to retrieve player object
    ```
    
    The player object returned will be the wistia player object itself

    #### wistiaData *service with following properties or functions*
    will support paging and sorting.
    ```
    Projects        -- angular resource object for https://api.wistia.com/v1/projects.json
    ProjectSharings -- angular resource object for https://api.wistia.com/v1/projects/:id/sharings.json
    Medias          -- angular resource object for https://api.wistia.com/v1/projects/:id/medias.json
    getAccountInfo  -- function to retrieve account information from https://api.wistia.com/v1/account.json
    Customizations  -- angular resource object for https://api.wistia.com/v1/medias/:id/customizations.json
    Captions        -- angular resource object for https://api.wistia.com/v1/medias/:hashedId/captions.json
    ```
    #### wistiaStats *service following functions*
    ```
    getAccountStats        -- function to retrieve accountStats from* https://api.wistia.com/v1/stats/account.json
    getProjectStats(projectId) -- function to retrieve projectStats from https://api.wistia.com/v1/stats/projects/:id.json
    getMediaStats(mediaId) -- function to retrieve mediaStats from https://api.wistia.com/v1/stats/medias/:id.json
    getVisitorStats        -- function to retrieve visitorsStats from https://api.wistia.com/v1/stats/visitors.json
    getEventsStats         -- function to retrieve eventsStats from https://api.wistia.com/v1/stats/events.json
    ```

