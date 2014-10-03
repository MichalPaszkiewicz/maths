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

function autoComplete()
{
	$("#math-words").removeClass("hidden");
}
