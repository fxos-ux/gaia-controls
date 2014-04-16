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

CSS files organization based off of http://smacss.com

### Base rules
base.css
* base font size set to 1px for ease of calculation.   1rem = 1pixel.  
* All measurements delcared in rem.   Because of this, the entire interface is responsive to this base font size.   
* Set base font-size to 1.5px for 1.5x resolution devices, 2.0px for retina resolution devices.

### layout rules
layout.css

### Module rules
modules.css


### theme rules
gaia.css
* Removing gaia.css will remove all the Gaia specific styling and leave a "white-label" generic design from a themed design can be added to.