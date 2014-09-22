var currentNumber = 1;
var lastFibonacci = "0";
var currentFibonacci = "1";
var endingString = "aaa";

function getNextFib()
{
	currentNumber++;
	var oldLastFibonacci = lastFibonacci;
	lastFibonacci = currentFibonacci;
	return currentFibonacci = currentFibonacci.add(oldLastFibonacci);
}

function getNextFibUI()
{
	var nextVal = getNextFib();
	$("#currentNumber").text( currentNumber );
	$("#currentVal").text( nextVal );
	window.scrollTo(0, 0);
}

function clearScore()
{
	currentNumber = 1;
	lastFibonacci = "0";
	currentFibonacci = "1";
	endingString = "aaa";
	updateUI();
}

function updateUI()
{
	$("#currentNumber").text( currentNumber );
	$("#currentVal").text( currentFibonacci );
	window.scrollTo(0, 0);
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function getPaddingString(length)
{
	var string = "";
	
	for(var i = 0; i < length; i++)
	{
		string += "0";
	}
	
	return string;
}

String.prototype.add = function(number){
	var thisLastDigit = this.length;
	var thatLastDigit = number.length;
	var carried = 0;
	var finalString = "";
	
	var tempThis = "0" + this;
	number = "0" + number;
	
	var padding = thisLastDigit - thatLastDigit;
	
	var paddingString = getPaddingString(Math.abs(padding));
	
	if(padding > 0)
	{
		number = paddingString + number;
	}
	else
	{
		tempThis = paddingString + tempThis;
	}
	
	for(var i = Math.min(thisLastDigit, thatLastDigit) + Math.abs(padding); i > -1; i--)
	{
		var newNum = tempThis.charCodeAt(i) + number.charCodeAt(i) + carried - 96;
		if(newNum >= 10)
		{
			carried = ( newNum - (newNum % 10) ) / 10;
			newNum = newNum % 10;
		}
		else
		{
			carried = 0;
		}
		
		finalString = newNum + finalString + "";
	}
	
	if(finalString[0] == "0"){ finalString = finalString.substr(1); }
	
	return finalString;
};

function getNext10000FibsUI()
{
	endingString = $("#ending").val();
	for(var i = 0; i < 9999 ; i ++)
	{
		getNextFib();
		if( (currentFibonacci + "").endsWith( endingString )){
			updateUI();
			return;
		}
	}
	getNextFibUI();
}

function getNthFib(n)
{

}
