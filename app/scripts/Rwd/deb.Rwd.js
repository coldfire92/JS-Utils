/* global DEBUGGER*/	
	
DEBUGGER.addMethod('checkConfigObj', function(Vars){
		
		'use strict';


		var typeOfConfig = typeof Vars.Config;

		var isNotDefined = function(variable){

			return (typeof variable === 'undefined') ? true : false;

		};

		if ( typeOfConfig == 'undefined' || !Vars) {

			this.print(Vars.moduleNameCall, 'Config is not defined', 'warn');
			return false;
		}

		if(typeOfConfig != 'object'){

			this.print(Vars.moduleNameCall, 'Config is not an object', 'warn');
			return false;

		}

		if(isNotDefined(Vars.Config.mobileWidth)){
			
			this.print(Vars.moduleNameCall, 'Config hasnt got mobileWidth property', 'warn');
			return false;

		}

		if(isNotDefined(Vars.Config.mobileWidth.max)){
			
			this.print(Vars.moduleNameCall, 'Config hasnt got mobileWidth.max property', 'warn');
			return false;

		}

		if(isNotDefined(Vars.Config.tabletWidth)){
			
			this.print(Vars.moduleNameCall, 'Config hasnt got tabletWidth property', 'warn');
			return false;

		}

		if(isNotDefined(Vars.Config.tabletWidth.min)){
			
			this.print(Vars.moduleNameCall, 'Config hasnt got tabletWidth.min property', 'warn');
			return false;

		}

		if(isNotDefined(Vars.Config.tabletWidth.max)){
			
			this.print(Vars.moduleNameCall, 'Config hasnt got tabletWidth.max property', 'warn');
			return false;

		}

		if(isNotDefined(Vars.Config.screenWidth)){
			
			this.print(Vars.moduleNameCall, 'Config hasnt got screenWidth property', 'warn');
			return false;

		}

		if(isNotDefined(Vars.Config.screenWidth.min)){
			
			this.print(Vars.moduleNameCall, 'Config hasnt got screenWidth.min property', 'warn');
			return false;

		}


		if(Vars.Config.screenWidth.min < Vars.Config.tabletWidth.man){
			
			this.print(Vars.moduleNameCall, 'screenWidth.min must be greater than tabletWidth.max', 'warn');
			return false;

		}

		if(Vars.Config.mobileWidth.max > Vars.Config.tabletWidth.min){
			
			this.print(Vars.moduleNameCall, 'tabletWidth.min must be greater than mobileWidth.max', 'warn');
			return false;

		}

		return true;
	

},['Config']);	


DEBUGGER.addMethod('isRwdModuleInit', function(Vars){

	'use strict';

	if(Vars.isInit !== true){

		this.print('RWD', 'Try to get ' + Vars.property+ ' but Rwd module not init', 'warn');
		return false;
	}

	return true;

},['isInit','property']);




