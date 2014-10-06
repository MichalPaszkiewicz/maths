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

complexNumber.prototype.plus = function(otherComplexNum)
{
	var newReal = this.real.plus(otherComplexNum.real);
	var newI = this.i.plus(otherComplexNum.i);
	
	return new complexNumber( newReal.positive, newReal.value, newI.positive, newI.value );
}

complexNumber.prototype.minus = function(otherComplexNum)
{
	var newReal = this.real.minus(otherComplexNum.real);
	var newI = this.i.minus(otherComplexNum.i);
	
	return new complexNumber( newReal.positive, newReal.value, newI.positive, newI.value );
}
