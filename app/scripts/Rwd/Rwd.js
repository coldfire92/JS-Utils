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

		 var isMobile = true,
			 isTablet = false,
		   	 isScreen = false;

		 var MatchMediaObject; // dependency injection

		 var matchMediaObjects = {
		 	mobileView : null,
		 	tabletView : null,
		 	screenView : null
		 };

		 var acceptHooks = [
		 	 //mobile
		 	'addOnMobileDeactive',
		 	'addOnMobileActive',
		 	'addOnMobileActiveInit',

		 	//tablet
		 	'addOnTabletDeactive',
		 	'addOnTabletActive',
		 	'addOnTabletActiveInit',
		 	
		 	//screen
		 	'addOnScreenDeactive',
		 	'addOnScreenActive',
		 	'addOnScreenActiveInit'

		 ];


		function addConfig(ConfigObj){
			

			if(DEBUGGER.call('checkConfigObj', {Config: ConfigObj}, "Rwd")) {

				Config = ConfigObj;
				 		
			}
		
		 }

		function getConfig(){
		 	
		 	return Config;

		 }


		function getIsScreen() {
		
			return isScreen;

		}

		function getIsTablet() {
			
			return isTablet;

		}

		function getIsMobile() {
		
			return isMobile;

		}



		// run when current view

		function screen(onInit){

			DEBUGGER.call('info','Screen View','RWD')

			isMobile = false;
			isTablet = false;
			isScreen = true;

			if(onInit){
				
		 		Hooks.doAction('RWD.addOnScreenActiveInit');
		 		return;
			}

		 	Hooks.doAction('RWD.addOnTabletDeactive');
		 	Hooks.doAction('RWD.addOnScreenActive');

		}

		function tablet(onInit){

			DEBUGGER.call('info','Tablet View','RWD')

			isMobile = false;
			isTablet = true;
			isScreen = false;
			

			if(onInit){
				
		 		Hooks.doAction('RWD.addOnTabletActiveInit');
		 		return;
			}

		 	Hooks.doAction('RWD.addOnMobileDeactive');
		 	Hooks.doAction('RWD.addOnTabletActive');

		}

		function mobile (onInit) {

			DEBUGGER.call('info','Mobile View','RWD');

			isMobile = true;
			isTablet = false;
			isScreen = false;
			

			if(onInit){				
				
				Hooks.doAction('RWD.addOnMobileActiveInit');
		 		return;
			}

		 	Hooks.doAction('RWD.addOnMobileActive');
		 	Hooks.doAction('RWD.addOnTabletDeactive');

		}

		function initTabletView() {
			
			var expression = "all and (min-width: "+Config.tabletWidth.min+"px) and (max-width: "+Config.tabletWidth.max+"px)";

			matchMediaObjects.tabletView = new MatchMediaObject(expression,'tablet');

			if(matchMediaObjects.tabletView.matches) tablet(true);

			matchMediaObjects.tabletView.addListener(function(mq){

				if(mq.matches){ tablet(false);}
				
			});


		}


		function initMobileView() {
			
			matchMediaObjects.mobileView = new MatchMediaObject('all and (max-width: '+ Config.mobileWidth.max + 'px)', 'mobile');

			if(matchMediaObjects.mobileView.matches) mobile(true);

			matchMediaObjects.mobileView.addListener(function(mq){


				if(mq.matches){ mobile(false);}

			});

		}

		function initScreenView() {
			
			matchMediaObjects.screenView = new MatchMediaObject('all and (min-width: '+ Config.screenWidth.min + 'px)', 'screen');

			if(matchMediaObjects.screenView.matches) {screen(true);}

			matchMediaObjects.screenView.addListener(function(mq){

				if(mq.matches){ screen(false);}
				
			});

		}

		function init(matchMedia){


			MatchMediaObject = matchMedia || function(mediaQuery){return window.matchMedia(mediaQuery);};
			

			initMobileView();
			initTabletView();
			initScreenView();	


			return true;

		}


		function addHook(type, fn, onInit){

			onInit = onInit || true; 

			if(acceptHooks.indexOf(type) == -1){

				DEBUGGER.call('warn', 'There isnt hook ' + type + ' on RWD mobile','RWD');

				return false;
			}

			if(typeof fn != "function"){

				DEBUGGER.call('error', 'Youd dont proper funciton to addHook method','RWD');

				return false;	

			}

			Hooks.addAction('RWD.'+type, fn);

		}

		// return all of the publicly available methods
		return {
			isTablet: getIsTablet,
			isMobile: getIsMobile, 
			isScreen: getIsScreen,
			addConfig: addConfig,
			getConfig: getConfig,
			addHook: addHook,
			init: init
		};

	};

	return new Rwd();

});