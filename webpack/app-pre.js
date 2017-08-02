// Scripts being loaded in <head>
// NOTE: Try to avoid big lib dependencies like jQuery here 

// Modernizr
// Generate custom build with configuration file ./components/.modernizrrc
// See all available options here: https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json
import Modernizr from 'modernizr';

// PACE.js 
// Display progress bar  
// https://github.com/HubSpot/pace
import './components/pace';

// Fonts
// Include our fonts
// NOTE: Could be moved to app-post, but it looks more beautiful this way :)
import './components/fonts';