var numVals = {}

numVals.add = function(key, value)
{
	numVals[key] = value + "";	
}

for( var i = 0; i < 10; i++ )
{
	var val = i + 48;
	numVals.add(i, val); 
}

for( var i = 0; i < 26; i++ )
{
	var val = i + 65;
	var char = String.fromCharCode(val);
	numVals.add(char, val);
	numVals.add(i + 10, val);
}

function number( positive, value )
{
	this.positive = positive;
	this.value = value + "";
	this.isHex = false;
	this.toString = function()
	{
		var sign = this.positive ? "+" : "-";
		return sign + this.value;
	}
}

//note: does not handle hex.
number.prototype.biggerThan = function( otherNumber, inclusive )
{
	if( this.positive && !otherNumber.positive ){ return true; }
	else if( !this.positive && otherNumber.positive ){ return false; }
	else if( !this.positive && !otherNumber.positive )
	{
		var tempNumber = new number( true, this.value );
		var tempOtherNumber = new number( true, otherNumber.value );
		return tempOtherNumber.biggerThan(tempNumber);
	}
	else
	{
		if( this.value.length > otherNumber.value.length )
		{
			return true;
		}
		else if( this.value.length < otherNumber.value.length )
		{
			return false;
		}
		else
		{
			for(var i = 0; i < this.value.length; i++)
			{
				if( parseInt(this.value[i]) > parseInt(otherNumber.value[i]))
				{
					return true;
				}	
				if( parseInt(this.value[i]) < parseInt(otherNumber.value[i]))
				{
					return false;
				}
			}
			
			if( inclusive == undefined || inclusive == false ){ return false; }
			if( inclusive == true ){ return true; }
		}
	}
}

number.prototype.smallerThan = function( otherNumber , inclusive)
{
	return otherNumber.biggerThan(this, inclusive);
}

number.prototype.biggerThanOrEqualTo = function( otherNumber )
{
	return this.biggerThan( otherNumber, true );
}

number.prototype.smallerThanOrEqualTo = function( otherNumber )
{
	return this.smallerThan( otherNumber, true );
}

function getPaddingString(length)
{
	var string = "";
	for(var i = 0; i < length; i++)
	{
		string += "0";
	}
	return string;
}

number.prototype.plus = function( otherNumber )
{
	if(!this.positive)
	{
		if(!otherNumber.positive)
		{
			var tempThis = new number(true, this.value);
			var tempThat = new number(true, otherNumber.value);
			var correctVal = tempThis.plus(tempThat).value;
			return new number(false, correctVal)
		}
		else
		{
			var tempThis = new number( true, this.value );
			return otherNumber.minus(this);
		}
	}
	else if(!otherNumber.positive)
	{
		var tempThat = new number( true, otherNumber.value );
		return this.minus(tempThat);
	}
	
	var thisLastDigit = this.value.length;
	var thatLastDigit = otherNumber.value.length;
	var carried = 0;
	var finalString = "";
	
	var tempThis = "0" + this.value;
	var tempOtherNumber = "0" + otherNumber.value;
	
	var padding = thisLastDigit - thatLastDigit;
	
	var paddingString = getPaddingString(Math.abs(padding));
	
	if(padding > 0)
	{
		tempOtherNumber = paddingString + tempOtherNumber;
	}
	else
	{
		tempThis = paddingString + tempThis;
	}
	
	for(var i = Math.min(thisLastDigit, thatLastDigit) + Math.abs(padding); i > -1; i--)
	{
		var newNum = tempThis.charCodeAt(i) + tempOtherNumber.charCodeAt(i) + carried - 96;
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
	
	while(finalString.length > 1 && finalString[0] == "0"){ finalString = finalString.substr(1); }
	
	return new number( true, finalString );
}

//todo: do this next
//note: only works for positive numbers for now.
//lies. This is not yet done.
number.prototype.minus = function( otherNumber )
{
	if(!this.positive)
	{
		if(!otherNumber.positive)
		{
			var tempThat = new number(true, otherNumber.value);
			return tempThat.plus(this);
		}
		else
		{
			return otherNumber.plus(this);
		}
	}
	else if(!otherNumber.positive)
	{
		var tempThat = new number( true, otherNumber.value );
		return this.plus(tempThat);
	}
	
	var thisLastDigit = this.value.length;
	var thatLastDigit = otherNumber.value.length;
	var carried = 0;
	var finalString = "";
	
	var tempThis = "0" + this.value;
	var tempOtherNumber = "0" + otherNumber.value;
	
	var positive = this.biggerThan(otherNumber, true);
	
	if(positive)
	{
		var padding = thisLastDigit - thatLastDigit;
		var paddingString = getPaddingString(Math.abs(padding));
		tempOtherNumber = paddingString + tempOtherNumber;
		
		for(var i = Math.min(thisLastDigit, thatLastDigit) + Math.abs(padding); i > -1; i--)
		{
			var newNum = tempThis.charCodeAt(i) - tempOtherNumber.charCodeAt(i) - carried;
			if(newNum < 0 )
			{
				carried = 1;
				newNum = (newNum + 10) % 10;
			}
			else
			{
				carried = 0;
			}
			
			finalString = newNum + finalString + "";
		}
		
		while(finalString.length > 1 && finalString[0] == "0"){ finalString = finalString.substr(1); }
		return new number( true, finalString );
	}
	else
	{
		var correctValue = otherNumber.minus(this).value;
		return new number( false, correctValue );
	}
}

//note: note implemented. Use newton-raphson division algorithm?
number.prototype.divideBy = function(divisor)
{
	if(divisor.value == "0")
	{
		alert("You cannot divide by 0!!!");
	}
	
	alert("not implemented!");
	
	return { quotient: this, remainder: 5 };
}

//note: returns array of numbers.
function splitInHalf(x)
{
	var result = [];
	result.push( new number( x.positive,  x.value.substr(0, Math.ceil( x.value.length / 2 )) ));
	result.push( new number( x.positive,  x.value.substr( Math.ceil( x.value.length / 2 ), x.value.length -  Math.ceil(x.value.length / 2)) ));

	return result;
}

function getChars(x, char)
{
	var n = x;
	result = "";
	while(n > 0){
		result += char;
		n--;
	}
	return result;
}

//note: this needs to be more accurate for x >> y and x << y, or will cause rounding errors.
function longMultiply(x, y)
{
	var positive = x.positive == y.positive;
	return new number(positive , parseInt(x.value) * parseInt(y.value) );
}

number.prototype.timesTenToThe = function(x)
{
	var tempThis = this;
	tempThis.value += getChars(x, "0");
	return tempThis;
}

function karatsuba(x, y)
{
	x_length = x.value.length;
	y_length = y.value.length;
	
	if(x_length == 1 || y_length == 1)
	{
		return longMultiply(x, y);
	}
	
	var deg = Math.floor(x_length / 2);
	
	var xSplit = splitInHalf(x);
	var ySplit = splitInHalf(y);

	var a = karatsuba(xSplit[0], ySplit[0]);
	var a_powed = a.timesTenToThe(2 * deg);
	var c = karatsuba(xSplit[1], ySplit[1]);
	var b = karatsuba(xSplit[0].plus(xSplit[1]), ySplit[0].plus(ySplit[1]));
	var b_minus_a = b.minus(a);
	var b_minus_a_minus_c = b_minus_a.minus(c);
	var b_powed = b_minus_a_minus_c.timesTenToThe(deg);

	return a_powed.plus(c).plus(b_powed);
}


