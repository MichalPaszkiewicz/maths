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
		if(wordArray[i].toLowerCase().substr(0, word.length) == word.toLowerCase())
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

$('body').on('click', '.ac-option', function() {
	var typedText = $("textarea").val();
	
	var index = typedText.lastIndexOf(" ");
	
	if(index == null || index == undefined)
	{
		index = 1;
	}
	
	var resultText = typedText.substr(0, index) + " " + $(this).text();

	$("textarea").val(resultText);
});
