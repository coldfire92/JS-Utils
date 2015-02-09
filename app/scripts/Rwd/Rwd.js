/* global define, DEBUGGER */

define('Rwd',['Hooks'], function (Hooks) {

	'use strict';

	var Rwd = function(){

		/**
		 * Maintain a reference to the object scope so our public methods never get confusing.
		 */
		
		 var isInit = false; // are module init (events add to widndow.matchMedia)

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

		 var isMobile = false,
			 isTablet = false,
		   	 isScreen = true;

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
			

			if(DEBUGGER.run('checkConfigObj', {Config: ConfigObj}, "Rwd")) {

				Config = ConfigObj;
				 		
			}
		
		 }

		function getConfig(){

		 	return Config;

		 }


		function getIsScreen() {

			var self = this;
			
			DEBUGGER.run('isRwdModuleInit', {
				isInit: self.isInit,
				property: 'isScreen'
			},'RWD')

			return isScreen;

		}

		function getIsTablet() {

			var self = this;
			
			DEBUGGER.run('isRwdModuleInit', {
				isInit: self.isInit,
				property: 'isTablet'
			},'RWD');

			return isTablet;

		}

		function getIsMobile() {

			var self = this;
			
			DEBUGGER.run('isRwdModuleInit', {
				isInit: self.isInit,
				property: 'isMobile'
			},'RWD');

			return isMobile;

		}


		// run when current view

		function screen(onInit){

			DEBUGGER.run('info','Screen View','RWD')

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

			DEBUGGER.run('info','Tablet View','RWD')

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

			DEBUGGER.run('info','Mobile View','RWD');

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

			this.isInit = true;

		}

		function destroy(){
			
			this.isInit = false;
			isMobile = false;
			isTablet = false;
		   	isScreen = true;

		}  


		function addHook(type, fn, onInit){

			onInit = onInit || true; 

			if(acceptHooks.indexOf(type) === -1){

				DEBUGGER.run('warn', 'There isnt hook ' + type + ' on RWD mobile','RWD');

				return false;
			}

			if(typeof fn !== 'function') {

				DEBUGGER.run('error', 'Youd dont proper funciton to addHook method','RWD');

				return false;	

			}

			Hooks.addAction('RWD.'+type, fn);

		}

		// return all of the publicly available methods
		return {
			isInit : false,
			isTablet: getIsTablet.bind(this),
			isMobile: getIsMobile.bind(this), 
			isScreen: getIsScreen.bind(this),
			addConfig: addConfig.bind(this),
			getConfig: getConfig.bind(this),
			destroy : destroy.bind(this),
			addHook: addHook.bind(this),
			init: init.bind(this),
		};

	};

	return new Rwd();

});
