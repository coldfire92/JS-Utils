/*global describe, it, expect, beforeEach, beforeAfter, _ */
(function(){
	'use strict';
	
	 describe('Rwd', function(){

	 	/*============================
	 	=            VARS            =
	 	============================*/
	 	
	 	var RwdModule;

	 	var defaultConfig = {
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


	 	 /*=============================================
	 	 =            SPY WINDOW.MATCHMEDIA            =
	 	 =============================================*/
	 	 
	 	 function getMediaMatchMock(typeInjectByJasmie, windowWidth, callEventListenerInject){

	 	 	callEventListenerInject = callEventListenerInject || false;

	 	 	var windowMediaMatch = function(MediaQuery, type){

	 	 		// set proper matches property
	 	 		
	 	 		var self = this;

	 	 		this.addListener = function(userFun){

	 	 			if(self.typeMockup == type &&
	 	 			   this.callEvent === true){
						
						userFun({
								matches: true
							}
						);

	 	 			}

	 	 		};

	 	 		if(type == 'mobile' && 
	 	 		   this.typeMockup == type && 
	 	 		   this.windowScreeMockup < this.configMock.mobileWidth.max){

						// is mobile view
						this.matches = true;
						return

	 	 		}

	 	 		if(type == 'tablet' && 
	 	 		   this.typeMockup == type && 
	 	 		   this.windowScreeMockup < this.configMock.tabletWidth.max &&
	 	 		   this.windowScreeMockup > this.configMock.tabletWidth.min
	 	 		   ){
						// is tablet view
						this.matches = true;
						return;
	 	 		}

	 	 		if(type == 'screen' && 
	 	 		   this.typeMockup == type && 
	 	 		   this.windowScreeMockup > this.configMock.screenWidth.min
	 	 		   ){
						// is tablet view
						this.matches = true;
						return;
	 	 		}

	 	 	};

		 	 windowMediaMatch.prototype = {
		 	 	test1: "test",
		 	 	matches: false,
		 	 	callEvent: callEventListenerInject,
		 	 	typeMockup: typeInjectByJasmie,
		 	 	windowScreeMockup: windowWidth,
		 	 	configMock: defaultConfig,

		 	 };

		 	 return windowMediaMatch

	 	 };



	 	/*=================================
		=            FUNCTIONS            =
		=================================*/

		
		var modifiedVar = '';		


		// mobiles
				
		function onMobileActive(){

			modifiedVar+='onMobileActive';	

		}

		function onMobileActiveInit(){

			modifiedVar+='onMobileActiveInit';	

		}

		function onMobileDeactive(){

			modifiedVar+='onMobileDeactive';	

		}


		// tablets
		
		function onTabletActiveInit(){

			modifiedVar+='onTabletActiveInit';	

		} 
		
		function onTabletDeactive(){

			modifiedVar+='onTabletDeactive';	

		}

		function onTabletActive() {

			modifiedVar+='onTabletActive';	



		};

		//screens
		
		function onScreenActiveInit() {

			modifiedVar+='onScreenActiveInit';	

			alert('onScreenActiveInit');

		};

		function onScreenActive() {

			modifiedVar+='onScreenActive';	

		};


		function onScreenDeactive() {

			modifiedVar+='onScreenDeactive';	

		};




	 	/*==========================================
	 	=            LOAD, TEST METHODS            =
	 	==========================================*/
	 	
	 	function addHooks(){

 			RwdModule.addHook('addOnMobileDeactive',onMobileDeactive);
     		RwdModule.addHook('addOnMobileActive', onMobileActive);
     		RwdModule.addHook('addOnMobileActiveInit', onMobileActiveInit);

     		RwdModule.addHook('addOnTabletDeactive' , onTabletDeactive);
     		RwdModule.addHook('addOnTabletActive', onTabletActive);
     		RwdModule.addHook('addOnTabletActiveInit', onTabletActiveInit);

     		RwdModule.addHook('addOnScreenDeactive', onScreenDeactive);
     		RwdModule.addHook('addOnScreenActive', onScreenActive);
     		RwdModule.addHook('addOnScreenActiveInit', onScreenActiveInit);

	 	}

	 	beforeEach(function(done){

          	  require(['Rwd'], function (Rwd) {

         		RwdModule = Rwd;

         		modifiedVar = '';

         		done();
         		
          	  });

         });

	 	/*===============================
	 	=            CONFIGS            =
	 	===============================*/ 

	 	 var goodConfig = {
 	 		mobileWidth : {
				max: 459
			},
			tabletWidth : {
				min: 560,
				max: 1090
			},
			screenWidth : {
				min : 1091
			}
	 	 };

	 	 var badConfigString = 'string';
	 	 var badConfigNumber = 24;
	 	 var badConfigUndefined;
	 	 var badConfigObject1 = {
	 	 	param1 : 'test'
	 	 };
	 	 var badCinfigObject2 = {
	 	 	mobileWidth : {
				max: 659
			},
			tabletWidth : {
				min: 560,
				max: 1090
			},
			screenWidth : {
				min : 291
			}
	 	 };	

	 	 describe("Config", function(){


		 	 it('should return default config when not pass another', function() {

		 	 	expect(_.isEqual(RwdModule.getConfig(), defaultConfig)).toBeTruthy();

		 	 });
		 	 
		 	 it('should apply good config', function() {
		 	 	
		 	 	RwdModule.addConfig(defaultConfig);
		 	 	RwdModule.addConfig(goodConfig);

		 	 	expect(_.isEqual(RwdModule.getConfig(), goodConfig)).toBeTruthy();

		 	 });

		 	  it('should not apply undefined as config', function() {
		 	 	
		 	 	RwdModule.addConfig(defaultConfig);
		 	 	RwdModule.addConfig(badConfigUndefined);
		 	 	
		 	 	expect(_.isEqual(RwdModule.getConfig(), defaultConfig)).toBeTruthy();

		 	 });

		 	  it('should not apply string as config', function() {
		 	 	
		 	 	RwdModule.addConfig(defaultConfig);
		 	 	RwdModule.addConfig(badConfigString);

		 	 	expect(_.isEqual(RwdModule.getConfig(), defaultConfig)).toBeTruthy();

		 	 });

		 	 it('should not apply number as config', function() {
		 	 	
		 	 	RwdModule.addConfig(defaultConfig);
		 	 	RwdModule.addConfig(badConfigNumber);

		 	 	expect(_.isEqual(RwdModule.getConfig(), defaultConfig)).toBeTruthy();

		 	 });


		 	 it('should not apply wrong objects as config', function() {
		 	 	
		 	 	RwdModule.addConfig(defaultConfig);
		 	 	RwdModule.addConfig(badConfigObject1);

		 	 	expect(_.isEqual(RwdModule.getConfig(), defaultConfig)).toBeTruthy();

		 	 });

		 	 it('should not apply objects with bad values as config', function() {
		 	 	
		 	 	RwdModule.addConfig(defaultConfig);
		 	 	RwdModule.addConfig(badCinfigObject2);

		 	 	expect(_.isEqual(RwdModule.getConfig(), defaultConfig)).toBeTruthy();

		 	 });

				
		});

		describe("Adding hooks", function(){

			it("show that bad hook name", function(){

				expect(RwdModule.addHook('ascasc', function(){})).toBeFalsy();

			});

			it("show that not pass proper function", function(){

				expect(RwdModule.addHook('addOnTabletDeactive')).toBeFalsy();

			});


		})
		
		/*==============================
		=            MOBILE            =
		==============================*/


		describe("Mobile View", function(){

			 var mediaMatch = getMediaMatchMock('mobile', 300);

			 beforeEach(function(){

			 	 modifiedVar= '';

			 });

			 it("properly get isMobile() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isMobile()).toBeTruthy();

			 });

			 it("properly get isTablet() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isTablet()).toBeFalsy();

			 });	

 			 it("properly get isScreen() method", function() {
			 	
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isScreen()).toBeFalsy();

			 });	


			it("run addOnMobileActive hook when set on init", function() {
			 	
			 	modifiedVar= '';
			 	addHooks();
			 	RwdModule.init(mediaMatch);
			 	expect(modifiedVar).toBe('onMobileActiveInit');

			 });

			 
			 it("run proper hooks add to addEvent", function() {

			 	mediaMatch = getMediaMatchMock('mobile', 300, true);
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);
			 	expect(modifiedVar).toBe('onMobileActiveInitonMobileActiveonTabletDeactive');

			 });
			
	 	 });


		/*==============================
		=            TABLET            =
		==============================*/
		

		describe("Tablet View", function(){

			 var mediaMatch = getMediaMatchMock('tablet', 500);

			 beforeEach(function(){

         		 modifiedVar = '';
         		 // addHooks();

			 });

			 it("properly get isMobile() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isMobile()).toBeFalsy();

			 });

			 it("properly get isTablet() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isTablet()).toBeTruthy();

			 });	

 			 it("properly get isScreen() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isScreen()).toBeFalsy();

			 });	


			it("run addOnTabletActive hook when set on init", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);
			 	expect(modifiedVar).toBe('onTabletActiveInit');

			 });

			 it("run proper hooks add to addEvent", function() {

			 	mediaMatch = getMediaMatchMock('tablet', 500, true);
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);
			 	expect(modifiedVar).toBe('onTabletActiveInitonMobileDeactiveonTabletActive');

			 });

	 	 });
		


		/*==============================
		=            SCREEN            =
		==============================*/


		describe("Screen View", function(){

			 var mediaMatch = getMediaMatchMock('screen', 1200);

			 beforeEach(function(){

         		 modifiedVar = '';
         		 // addHooks();

			 });

			 it("properly get isMobile() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isMobile()).toBeFalsy();

			 });

			 it("properly get isTablet() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isTablet()).toBeFalsy();

			 });	

 			 it("properly get isScreen() method", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);	
			 	expect(RwdModule.isScreen()).toBeTruthy();

			 });	


			it("run addOnScreenActive hook when set on init", function() {
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);
			 	expect(modifiedVar).toBe('onScreenActiveInit');

			});

	 		it("run proper hooks add to addEvent", function() {

			 	mediaMatch = getMediaMatchMock('screen', 1200, true);
			 	
			 	modifiedVar= '';
			 	RwdModule.init(mediaMatch);
			 	expect(modifiedVar).toBe('onScreenActiveInitonTabletDeactiveonScreenActive');

			 });
			
	 	 });

	 });

})();