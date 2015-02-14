
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

		}


	};


});