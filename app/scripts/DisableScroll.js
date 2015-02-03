/*global DEBUGGER */

/**
 * Let disable or enable scroll
 */
define('DisableScroll',[], function(){
	
	'use strict';

	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = [37, 38, 39, 40];

	var preventDefault = function(e) {
	  e = e || window.event;
	  if (e.preventDefault) e.preventDefault();
	  e.returnValue = false;  
	};

	var keydown = function(e) {
	    for (var i = keys.length; i--;) {
	        if (e.keyCode === keys[i]) {
	            preventDefault(e);
	            return;
	        }
	    }
	};

	var wheel = function(e) {
	  preventDefault(e);
	};

		
	return {

			/**
			 * Disable scroll
			 */
			disable: function(){

			    if (window.addEventListener) {
	     		     window.addEventListener('DOMMouseScroll', wheel, false);
	 		    }
			    
			    window.onmousewheel = document.onmousewheel = wheel;
			    document.onkeydown = keydown;

			    DEBUGGER.run('info', 'Disable scroll events');

			},

			/**
			 * Enable scroll
			 */
			enable: function(){

				if (window.removeEventListener) {
	       			 window.removeEventListener('DOMMouseScroll', wheel, false);
	    		}

	    	    window.onmousewheel = document.onmousewheel = document.onkeydown = null;

	    	    DEBUGGER.run('info', 'Enable scroll events');

			}

	};

});
