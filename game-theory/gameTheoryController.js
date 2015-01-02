var gameModule = angular.module('app', []).
	controller("gameTheoryControl", function gameTheoryControl($scope){
	    	
	    	function number(num){ 
	    		this.name = num; 
	    		this.selected = false;
	    		return this;
	    	}
	    	
	    	$scope.numbers=[];
	    	$scope.solutions=[];
	    	
	    	$scope.getStarter = function(){
	    		var isEven = ($scope.solutions.length % 2) == 0;
	    		
	    		if(isEven){
	    			return "Alice";
	    		}
	    		else{
	    			return "Bob";
	    		}
	    	}
	    	
	    	function solution(x, parts){
	    		this.number = x;
	    		this.parts = parts;
	    	}
	    	
	    	$scope.amount = 5;
	    	
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
					num--;
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
		
		/*var getCombinations = function(startArray, arrayOfNumbers){
			var results = [];
			for(var i = 0; i < arrayOfNumbers.length; i++){
				results.push(startArray.concat(arrayOfNumbers[i]));

				var tempArray = [];
				for(var j = i + 1; j < arrayOfNumbers.length; j++){
					tempArray.push(arrayOfNumbers[j]);
				}
				
				results = results.concat(getCombinations(startArray.concat(arrayOfNumbers[i]), tempArray));
			}
			return results;
		}*/
		
		var getResult = function(startArray, arrayOfNumbers, expected){
			var results = [];
			for(var i = arrayOfNumbers.length - 1; i > -1; i--){
				results.push(startArray.concat(arrayOfNumbers[i]));
				if(sumOf(startArray.concat(arrayOfNumbers[i]))==expected){
					return {result: true, values: startArray.concat(arrayOfNumbers[i])};
				}

				var tempArray = [];
				for(var j = 0; j < i; j++){
					tempArray.push(arrayOfNumbers[j]);
				}
				
				var newCombinations = getResult(startArray.concat(arrayOfNumbers[i]), tempArray, expected);
				if(newCombinations.result == true){return newCombinations;}
				else{
					results = results.concat(newCombinations);
				}
			}
			return results;
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
				
				for(var i = 0; i < $scope.numbers.length; i++){
					if($scope.numbers[i].name == currentNumber)
					{
						solved = true;
						$scope.solutions.push(new solution(currentNumber, [$scope.numbers[i].name]));
					}
				}
				
				if(!solved){
					var returnses = getResult([], smallerNums, currentNumber);
					if(returnses.result == true){
						solved = true;
					}
					else{
						calculable = false; break;
					}
				}
				
				/*if(!solved){
					var combinations = getCombinations([], smallerNums);
					
						for(var i = 0; i < combinations.length; i++){
							if(sumOf(combinations[i]) == currentNumber){
								$scope.solutions.push(new solution(currentNumber, combinations[i]));
								solved = true;
								break;
							}
							if(solved){break;}
						}
					
					
					if(!solved){
						calculable = false; break;
					}
				}*/
				
				currentNumber++;
			}
		}
		
		$scope.newNumbers();
	
	});
