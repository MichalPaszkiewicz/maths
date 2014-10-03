//only works for positive for now!
var getNumberOne = function(){
	return new number( true, $("#number-one").text() );
}

var getNumberTwo = function(){
	return new number( true, $("#number-two").text() );
}

 
var doAdd = function(){
	var result = getNumberOne().plus(getNumberTwo());
 	$("#result").text( result );
}

var doSubtract = function(){
	var result = getNumberOne().minus(getNumberTwo());
 	$("#result").text( result );
