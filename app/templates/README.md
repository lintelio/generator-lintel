<%= props.slugName %>
=====================

> <%= props.description %>


## Getting Started
This module requires Lintel.

If you haven't used [Lintel](http://lintel.io/) before, be sure to check out the [Getting Started](http://lintel.io/getting-started) guide, as it explains how to install and use this module. Once you're familiar with that process, you may install this module with this command:

```shell
bower install <%= props.slugName %> --save
```

Once the module has been installed, you will have to load it in your main SASS file:

```scss
@import "bower_components/<%= props.slugName %>/sass/<%= props.slugName %>.scss"
```

You can use [wiredep](https://github.com/taptapship/wiredep) or [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep) to automatically inject files in your build process.


## Variables
Check the vars file in the `sass` folder to see the full list of variables you can customize.

#### $sample-bg
Default value: `#4b77be`  

Change the post background.

#### $sample-color
Default value: `#fff`

Change the post color.


## Mixins
Check the mixins file in the `sass` folder to see how you can extend this module.

#### sample-mixin($bg, $color)
Default $bg: `$sample-bg`  
Default $color: `$sample-color`

Sets the background color and text color of an element.

```scss
.post {
  @include sample-mixin(#fff, #000);
}
```


## Examples

#### Single Post
```html
<div class="post">
  Hello world!
</div>
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) <%= props.currentYear %> <%= props.authorName %>. Licensed under the <%= props.license %> license.
