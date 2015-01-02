var gameModule = angular.module('app', []).
	controller("gameTheoryControl", function gameTheoryControl($scope){
	    	
	    	function number(num){
	    		this.name = num; 
	    		this.selected = false;
	    		return this;
	    	}
	    	
	    	$scope.numbers=[];
	    	
	    	$scope.amount = 10;
	    	
	    	$scope.newNumbers = function(){
			$scope.numbers = [];
			
			intAmount = parseInt($scope.amount);
			
			for(var i = 1; i < intAmount + 1; i++){
				$scope.numbers.push(new number(i));
			}
		}

		$scope.deleteSelected = function(){
			for(var num in $scope.numbers){
				if($scope.numbers[num].selected){
					$scope.numbers.splice(num, 1);
				}
			}
		}
		
		$scope.newNumbers();
	
	});
