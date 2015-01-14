/* global define*/

define('Rwd',['Hooks'], function (Hooks) {

	'use strict';
	

	var Rwd = function(){

		/**
		 * Maintain a reference to the object scope so our public methods never get confusing.
		 */

		 var Config = {
			 	mobileWidth : {
					max: 459
				},
				tabletWidth : {
					min: 460,
					max: 890
				},
				screenWidth : {
					min : 891
				}

		 };


		function addConfig(ConfigObj){
			

			if(DEBUGGER.call('checkConfigObj', {Config: ConfigObj}, "Rwd")) {

				Config = ConfigObj;
				 		
			}
		
		 }

		function getConfig(){
		 	
		 	return Config;

		 }


		function isScreen() {
		

		}

		function isTablet() {
		

		}

		function isMobile() {
		

		}


		// return all of the publicly available methods
		return {
			isTablet: isTablet,
			isMobile: isMobile, 
			isScreen: isScreen,
			addConfig: addConfig,
			getConfig: getConfig
		};

	};

	return new Rwd();

});
