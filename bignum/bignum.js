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
number.prototype.biggerThan( otherNumber, inclusive )
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
			return true;
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
			
			if( inclusive == undefined ||){ return false; }
			if( inclusive == true ){ return true; }
		}
	}
}

number.prototype.smallerThan( otherNumber , inclusive)
{
	return otherNumber.biggerThan(this, inclusive);
}

number.prototype.biggerThanOrEqualTo( otherNumber )
{
	return this.biggerThan( otherNumber, true );
}

number.prototype.smallerThanOrEqualTo( otherNumber )
{
	return this.smallerThan( otherNumber, true );
}

//note: only works for positive numbers for now.
number.prototype.plus( otherNumber )
{
	var thisLastDigit = this.value.length;
	var thatLastDigit = otherNumber.value.length;
	var carried = 0;
	var finalString = "";
	
	var tempThis = "0" + this.value;
	otherNumber = "0" + otherNumber.value;
	
	var padding = thisLastDigit - thatLastDigit;
	
	var paddingString = getPaddingString(Math.abs(padding));
	
	if(padding > 0)
	{
		otherNumber = paddingString + otherNumber;
	}
	else
	{
		tempThis = paddingString + tempThis;
	}
	
	for(var i = Math.min(thisLastDigit, thatLastDigit) + Math.abs(padding); i > -1; i--)
	{
		var newNum = tempThis.charCodeAt(i) + otherNumber.value.charCodeAt(i) + carried - 96;
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
	
	return new number( true, finalString );
}

//todo: do this next
//note: only works for positive numbers for now.
//lies. This is not yet done.
number.prototype.minus( otherNumber )
{
	var thisLastDigit = this.value.length;
	var thatLastDigit = otherNumber.value.length;
	var carried = 0;
	var finalString = "";
	
	var positive = this.biggerThan(otherNumber);
	
	var tempThis = "0" + this.value;
	otherNumber = "0" + otherNumber.value;
	
	var padding = thisLastDigit - thatLastDigit;
	
	var paddingString = getPaddingString(Math.abs(padding));
	
	if(padding > 0)
	{
		otherNumber = paddingString + otherNumber;
	}
	else
	{
		tempThis = paddingString + tempThis;
	}
	
	for(var i = Math.min(thisLastDigit, thatLastDigit) + Math.abs(padding); i > -1; i--)
	{
		var newNum = tempThis.charCodeAt(i) + otherNumber.value.charCodeAt(i) + carried - 96;
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
	
	return new number( true, finalString );
}

//note: note implemented. Use newton-raphson division algorithm?
number.prototype.divideBy(divisor)
{
	if(divisor.value == "0")
	{
		alert("You cannot divide by 0!!!");
	}
	
	return { quotient: this, remainder: 5 };
}

number.prototype.getHex()
{
	var hexString = "";
	var quotient = new number(this.positive, this.value);
	var divisor = new number( true, 16 );
	
	for(var i = 0; i < this.value.length; i++)
	{
		var result = quotient.divideBy( divisor );
		quotient = result.quotient;
		hexString = numVals[result.remainder] + hexString;
	}
	
	return hexString;
}

function complexNumber( realPositive, realValue, iPositive, iValue)
{
	this.real = new number( realPositive, realValue );
	this.i = new number( iPositive, iValue );
	this.toString = function()
	{
		var realSign = this.real.positive ? "+" : "-";
		var iSign = this.i.positive ? "+" : "-";
		return realSign + this.real.value + iSign + this.i.value + "i";
	}
}
