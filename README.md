# Firefox OS Styleguide

## Goals
* Design a new more efficient and easier to maintain CSS styles structure for Gaia.
* Learn how we can leverage new browser features such as CSS variables and Web components as part of this new structure.
* Integrate accessibility, localization, RTL requirements.
* Create a set of best practices when writing and maintaining CSS for Gaia.
* Provide a design and code reference for Gaia UI components.  

### Visual designs
* https://www.dropbox.com/sh/up9028j8lj3s9pq/D874Y6Tbl1
* https://www.dropbox.com/sh/g6rit30f300tvo8/PfoBMc69L-


## About the CSS
### folders
    /style
        /app/        Application specific styles (contacts, email, etc.)
        /shared/     This would represent the Gaia shared styles.
    

### /style/shared

#### base.css
Base rules

* Base rules, almost exclusivly single element selectors.   This would represent the "default" styles.
* Scaling is controlled by the base font-size declaration in html, body.    All dimensional declarations are relative to this base size.    With this, the entire design is responsive to any pixel density and resolution.
* Base font size set to 1px for ease of calculation.   1rem = 1pixel.  
* base CSS variables also defined here.

#### layout.css
Layout rules

* Layout rules divide a page into sections and hold one or more modules together.
* Helper classes for alignment, spacing, grids and clearfix are defined here.
* Media queries for responsive layout are also included in this file.

#### modules.css
Module rules

* A module is a discreet UI component.   
* Headers, buttons, tabs, menus are some of the UI components defined here.

#### gaia.css
theme rules

* The Gaia theme sits on-top of the base "White-label" design.   
* If removed, you will see the basic "skinnable" design in which we can add theme files for customization.
* Gaia apps are sub-themed into 4 categories:  Media, Settings, Productivity and Communication.   Each one of these sub-themes have their own set of styles.

### /style/app folder
apps.css
* Specific styles that do not exist and are not reused anywhere else.

### /style/styleguide folder
styleguide.css
* Styles that are specific to this styleguide app only.


### Additional information
* Approach based on ideas from SMACSS and OOCSS
    * http://smacss.com
    * https://github.com/stubbornella/oocss/

### Open question
* ? have a file for z-index.
* adjusting base font-size to 1.5px will give you a fractional pixels.   How should we address this?   We could use absolute pixel definitions in these cases.    The problem with this approach however would be that 1px on a high resolution device may not be even visible.



