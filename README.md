## Angular attachments app for [Wistia](http://wistia.com/hello) video hosting service

> Work in progress to separate reusable wistia directives from sample app into its own module

### **Directive _aw-attachments_**
> Usage:
```html
<div aw-attachments
     owner-id="{{itemId}}"
     viewer="showVideoPlayer(media)"
     upload-options="uploadOptions">
</div>
```
where
  * `owner-id`: Unique id of arbitrary business object which may have concept of video being associated as attachments
  * `viewer`: expression to invoke any javascript function. media object is avaialble as locals for injection (for reference see http://wistia.com/doc/data-api#medias).
  * `upload-options`: upload options of jquery file upload plugin (for reference see https://github.com/blueimp/jQuery-File-Upload/wiki/Options)

### Directive aw-player
> Usage:
```html
<div wistia-player
     src-hashed-id="media.hashed_id">
</div>
```
where
  * `src-hashed-id`: hashed id of wistia media object

### Demo
http://basghar.github.io/angular-wistia/

### TO-DOs
Right now todos are embedded in the source code. And I want to force myself to use some automated way to generate todos.md

https://github.com/Bartvds/grunt-todos seems a good start.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/basghar/angular-wistia/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

