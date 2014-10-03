var words = {
	plus : "",
	minus : "",
	multiplyBy: "",
	divideBy: ""
}

function getRelevantWords(word)
{
	var wordArray = Object.getOwnPropertyNames(words);
	var relevantWords = [];
	for(var i = 0; i < wordArray.length; i++)
	{
		if(wordArray[i].substr(0, word.length) == word)
		{
			relevantWords.push(wordArray[i]);
		}
	}
	return relevantWords;
}

function optionString(item)
{
	return "<option value='" + item + "'>" + item + "</option>";
}

function fullOptionString(items)
{
	var result = "";
	
	for(var i = 0; i < items.length; i++)
	{
		result += optionString(items[i]);
	}
	return result;
}

function autoComplete()
{
	$("#math-words").removeClass("hidden");
	
	var relevantWord = $("textarea").val();
	
	$("#math-words").html( fullOptionString( getRelevantWords(relevantWord) ));
}
