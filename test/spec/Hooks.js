/*global describe, it */
'use strict';

(function () {
  
    describe('Hooks', function () {



      /*============================
      =            VARS            =
      ============================*/
        
        function filter_a( str ) {
          return str + 'a';
        }

        function filter_b( str ) {
          return str + 'b';
        }

        function filter_c( str ) {
          return str + 'c';
        }

        function action_a( value ) {
          window.actionValue += 'a';
        }

        function action_b( value ) {
          window.actionValue += 'b';
        }

        function action_c( value ) {
          window.actionValue += 'c';
        }


        var HooksModule,HooksModule2;

     
      /*===================================
      =            LOAD MODULE            =
      ===================================*/
      
      beforeEach(function(done){

          require(['Hooks'], function (Hooks) {
           
             HooksModule = Hooks;

             HooksModule.removeFilter('test.filter');
             HooksModule.removeAction('test.action');  
             window.actionValue = '';
              
             done();

          });

      });
    
         
      it("should load the AMD Hooks module", function(done) {
          
          expect(HooksModule.removeFilter).toBeDefined();
        
      }); 


      it("can access to applyFilters", function() {

        expect(HooksModule.removeFilter).toBeDefined();

      });


      it("can access to addFilter", function() {

        expect(HooksModule.addFilter).toBeDefined();

      });

      it("can access to removeAction", function() {

        expect(HooksModule.removeAction).toBeDefined();

      });

      it("can access to doAction", function() {

        expect(HooksModule.doAction).toBeDefined();

      });

      it("can access to addAction", function() {

        expect(HooksModule.addAction).toBeDefined();

      });


      /*==============================
      =            FILTER            =
      ==============================*/

      describe("Filters", function(){

            it("add filter and remove", function() {
              
              HooksModule.addFilter( 'test.filter', filter_a );
              HooksModule.removeFilter( 'test.filter' );

              expect(HooksModule.applyFilters( 'test.filter', 'test' )).toBe('test');

            });

            it("add a filter and run it", function() {
              
              HooksModule.addFilter( 'test.filter', filter_a );

              expect(HooksModule.applyFilters( 'test.filter', 'test' )).toBe('testa');

            });

            it("add 2 filters in a row and run them", function() {
              
              HooksModule.addFilter( 'test.filter', filter_a );
              HooksModule.addFilter( 'test.filter', filter_b );

              expect(HooksModule.applyFilters( 'test.filter', 'test' )).toBe('testab');

            });

            it("add 3 filters with different priorities and run them", function() {
              
                HooksModule.addFilter( 'test.filter', filter_a );
                HooksModule.addFilter( 'test.filter', filter_b, 2 );
                HooksModule.addFilter( 'test.filter', filter_c, 8 );

              expect(HooksModule.applyFilters( 'test.filter', 'test' )).toBe('testbca');

            });

            it("chain 3 filters with different priorities and then run them", function() {
              
                HooksModule
                           .addFilter( 'test.filter', filter_a )
                           .addFilter( 'test.filter', filter_b, 2 )
                           .addFilter( 'test.filter', filter_c, 8 )

              expect(HooksModule.applyFilters( 'test.filter', 'test' )).toBe('testbca');

            });

     });

      /*===============================
      =            ACTIONS            =
      ===============================*/

      describe("Actions", function(){


                it("add and remove an action", function() {
                
                  
                  HooksModule.addAction( 'test.action', action_a );
                  HooksModule.removeAction( 'test.action' );
                  HooksModule.doAction( 'test.action' );

                  expect(window.actionValue).toBe('');

              }); 


                it("add and exec an action", function() {
                  
                    
                    HooksModule.addAction( 'test.action', action_a );
                    HooksModule.doAction( 'test.action' );

                    expect(window.actionValue).toBe('a');


                }); 


                it("add 2 actions in a row and then run them", function() {
                  
                    
                    HooksModule.addAction( 'test.action', action_a );
                    HooksModule.doAction( 'test.action' );

                    expect(window.actionValue).toBe('a');


                }); 


                it("exec action which isnt added", function() {
                  
                    
                    HooksModule.doAction( 'test.action' );

                    expect(window.actionValue).toBe('');


                }); 



      });
      
      


      it("exec filter which isnt added", function() {
        
          
          expect(HooksModule.applyFilters( 'test.filter2', 'test' )).toBe('test');


      }); 



      it("add 3 actions with different priorities and run them", function() {
        
          HooksModule.addAction( 'test.action', action_a );
          HooksModule.addAction( 'test.action', action_b, 2 );
          HooksModule.addAction( 'test.action', action_c, 8 );

          HooksModule.doAction( 'test.action' );

        expect(window.actionValue).toBe('bca');

      });

      it("chain 3 actions with different priorities and then run them", function() {
        
          HooksModule
                     .addAction( 'test.action',  action_a )
                     .addAction( 'test.action',  action_b, 2 )
                     .addAction( 'test.action',  action_c, 8 )

          HooksModule.doAction( 'test.action' );           

          expect(window.actionValue).toBe('bca');

      });
      
      
      it("pass in two arguments to an action", function() {
        
          var arg1 = 10,
              arg2 = 20;

          HooksModule.addAction( 'test.action',  function(a,b){window.actionValue = a + b;} )
          HooksModule.doAction( 'test.action', arg1, arg2 );           

          expect(window.actionValue).toBe(30);

      });


       it("fire action multiple times", function() {
        

          HooksModule.addAction( 'test.action', action_a );
          
          HooksModule.doAction( 'test.action' );           
          HooksModule.doAction( 'test.action' );   
          HooksModule.doAction( 'test.action' );   
          HooksModule.doAction( 'test.action' );   

          expect(window.actionValue).toBe("aaaa");

      });


       /*=============================
       =            CACHE            =
       =============================*/

       it("should return all hooks", function() {
         
          HooksModule.addAction( 'test.action', action_a );

          HooksModule.doAction( 'test.action' ); 

          console.log(HooksModule.getAll());
          
          expect(window.actionValue).toBe("a");

       });
       
      it("require should cache Hooks ", function(done) {
          
          HooksModule.addAction( 'test.action', action_a );
          
          require(['Hooks'], function (Hooks) {

             // Hooks is should the same object like HooksModule
           
             HooksModule2 = Hooks;
             HooksModule2.addAction( 'test.action', action_b );

             HooksModule2.doAction( 'test.action' )

             expect(window.actionValue).toBe("ab");

             done();

          });

      }); 
      
    });
})();
