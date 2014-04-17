# Firefox OS Styleguide

## Goals
* Design a new more efficient and easier to maintain CSS styles structure for Gaia.
* Learn how we can leverage new browser features such as CSS variables and Web components as part of this new structure.
* Integrate accessibility, localization, RTL requirements.
* Create a set of best practices when writing and maintaining CSS for Gaia.
* Provide a design and code reference for Gaia UI components.

## Visual design reference
* https://www.dropbox.com/sh/up9028j8lj3s9pq/D874Y6Tbl1
* https://www.dropbox.com/sh/g6rit30f300tvo8/PfoBMc69L-

## Considerations
* It would be great to have some kind of live documentation output from this code so that 
* Responsive to phone, tablet and other form factors.


## About CSS

### Base rules
base.css
* base font size set to 1px for ease of calculation.   1rem = 1pixel.  
* All measurements delcared in rem.   Because of this, the entire interface is responsive to this base font size.   
* Set base font-size to 1.5px for 1.5x resolution devices, 2.0px for retina resolution devices.
* Default colors, dimensions, font variables are set here.

### layout rules
layout.css
* layout
* alignment, spacing and grids
* layout helpers such as clearfix exist here.
* mediaqueries

### Module rules
modules.css
specific UI modules
* headers, menus, tabs, inputs, ...
* All modules can standalone and do not rely on markup structure to work.

### theme rules
gaia.css
* Removing gaia.css will remove all the Gaia specific styling and leave a "white-label" generic design from a themed design can be added to.

CSS files organization based off of http://smacss.com

### open questions
* ? have a file for z-index.
* adjusting base font-size to 1.5px will give you a fractional pixels.   How should we address this?   We could use absolute pixel definitions in these cases.    The problem with this approach however would be that 1px on a high resolution device may not be even visible.

### best practices
* always specify margins and padding in single direction.   
* use class names only.   do not target id's or tags unless in base.css where you are styling default element styles.
* use !important specificity only in state.css
* javascript should toggle styles using classnames.   so rather than setting display: none inline on element, use .is-hidden class in state.