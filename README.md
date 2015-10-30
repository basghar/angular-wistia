## Angular attachments app for [Wistia](http://wistia.com/hello) video hosting service

> Work in progress to separate reusable wistia directives from sample app into its own module 

### Directive aw-attachments
> Usage:
```html
<div aw-attachments owner-id="{{itemId}}"
     viewer="showVideoPlayer(media)"
     upload-options="uploadOptions"></div>
```
where 
  * `owner-id`: Unique id of arbitrary business object which may have concept of video being associated as attachments
  * `viewer`: expression to invoke any javascript function. media object is avaialble as locals for injection (for reference see http://wistia.com/doc/data-api#medias).
  * `upload-options`: upload options of jquery file upload plugin (for reference see https://github.com/blueimp/jQuery-File-Upload/wiki/Options) 

### Demo 
http://basghar.github.io/angular-wistia/
