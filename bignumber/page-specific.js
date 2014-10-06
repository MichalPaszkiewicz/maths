//only works for positive for now!
var getNumberOne = function(){
	return new number( true, $("#number-one").val() );
}

var getNumberTwo = function(){
	return new number( true, $("#number-two").val() );
}

 
var doAdd = function(){
	var result = getNumberOne().plus(getNumberTwo());
 	$("#result").text( result.toString() );
}

var doSubtract = function(){
	var result = getNumberOne().minus(getNumberTwo());
 	$("#result").text( result.toString() );
}

var doMultiply = function()
{
	var result = getNumberOne().multiplyBy(getNumberTwo());
	$("#result").text( result.toString());
}

var doDivide = function()
{
	alert("not implemented!");
}
