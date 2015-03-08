
/**
 * Some utils for projects
 */
define('Utils', [], function () {
	
	'use strict';


	return {

		/**
		 * Reload page
		*/
		reload : function(){

			window.location.reload();

		},

		/**
		 * Redirect page
		 * @param  {string} url 
		 * @return {void}   
		 */
		redirect : function(url){

			if(url === window.location.href) this.reload(); // reload if that same page

			window.location.href = url;

		},


		/**
		 * Return is IE browser
		 * http://stackoverflow.com/questions/4169160/javascript-ie-detection-why-not-use-simple-conditional-comments/16657946#16657946
		 * 
		 * @return {Boolean} 
		 */
		isIE : function(){

			var undef,rv = -1; // Return value assumes failure.
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf('MSIE ');
			var trident = ua.indexOf('Trident/');

			if (msie > 0) {
				// IE 10 or older => return version number
				rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			} else if (trident > 0) {
				// IE 11 (or newer) => return version number
				var rvNum = ua.indexOf('rv:');
				rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
			}

			return ((rv > -1) ? rv : undef);
		
		}


	};


});