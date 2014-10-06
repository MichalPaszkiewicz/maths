number.prototype.getHex = function()
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
