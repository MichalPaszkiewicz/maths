var gameModule = angular.module('app', []).
	controller("gameTheoryControl", function gameTheoryControl($scope){
	    	
	    	function number(num){
	    		this.name = num; 
	    		this.selected = false;
	    		return this;
	    	}
	    	
	    	$scope.numbers=[];
	    	$scope.solutions=[];
	    	
	    	function solution(x, parts){
	    		this.number = x;
	    		this.parts = parts;
	    	}
	    	
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
		
		function sumOf(parts){
			var num = 0;
			for(var i = 0; i < parts.length; i++){
				num += parts[i];
			}
			return num;
		}
		
		function getSmallerNumbers(number){
			var newArray = [];
			for(var i = 0; i < $scope.numbers.length; i++){
				if($scope.numbers[i].name <= number){
					newArray.push($scope.numbers[i].name);
				}
				else{
					break;
				}
			}
			return newArray;
		}
		
		function getCombinations(parts) {
		  var result = [];
		  var f = function(firstParts, parts) {
		    for (var i = 0; i < parts.length; i++) {
		      result.push(firstParts.concat(parts[i]));
		      f(firstParts.concat(parts[i]), parts.splice(i + 1));
		    }
		  }
		  f([], parts);
		  return result;
		}
		
		$scope.getSolutions = function(){
			$scope.solutions = [];
			var calculable = true;
			var currentNumber = 1;
			
			while(calculable){
				parts = [];
				
				var solved = false;
				
				var smallerNums = getSmallerNumbers(currentNumber);
				
				if(smallerNums.length == 0){
					calculable = false; break;
				}
				
				var combinations = getCombinations(smallerNums);
				
					for(var i = 0; i < combinations.length; i++){
						if(sumOf(parts) == currentNumber){
							$scope.solutions.push(new solution(currentNumber, parts));
							solved = true;
						}
					}
				
				
				if(!solved){
					calculable = false; break;
				}
				
				currentNumber++;
			}
		}
		
		$scope.newNumbers();
	
	});
