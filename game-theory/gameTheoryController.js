var gameModule = angular.module('app', []).
	controller("gameTheoryControl", function gameTheoryControl($scope){
	    	
	    	function number(num){
	    		this.name = num; 
	    		return this;
	    	}
	    	
	    	$scope.numbers=[{name: 1},{name: 2}, {name: 3}];
	    	
	    	$scope.amount = 10;
	    	
	    	$scope.newNumbers = function(){
			$scope.numbers = [];
			
			intAmount = parseInt($scope.amount);
			
			for(var i = 1; i < intAmount + 1; i++){
				$scope.numbers.push(new number(i));
			}
		}
		
		$scope.newNumbers();
	
	});
