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
	 	
	 	/*==========================================
	 	=            LOAD, TEST METHODS            =
	 	==========================================*/
	 	

	 	 it('should load the AMD Rwd module', function(done) {
          
          
          require(['Rwd'], function (Rwd) {
           
             RwdModule = Rwd;

              expect(RwdModule.addConfig).toBeDefined();
	         
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


	 });


})();