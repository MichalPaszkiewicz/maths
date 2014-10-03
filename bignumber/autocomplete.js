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
	return "<div class='ac-option' value='" + item + "'>" + item + "</div>";
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
	
	var typedText = $("textarea").val();
	
	var relevantWord =  typedText.split(' ').pop();
	
	$("#math-words").html( fullOptionString( getRelevantWords(relevantWord) ));
}
