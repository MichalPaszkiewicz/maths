var words = {
	plus : "",
	minus : "",
	multiplyBy: "",
	divideBy: ""
}

var selectedOption = 0;
var numberOfOptions = 0;

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

function optionString(item, i, classText)
{
	var selectedString = "";
	
	if(classText != null && classText != undefined)
	{
		selectedString = classText;
	}
	
	return "<div id='aco" + i + "' class='ac-option " + selectedString + "' value='" + item + "'>" + item + "</div>";
}

function fullOptionString(items)
{
	selectedOption = 0;
	numberOfOptions = items.length;
	
	var result = "";
	
	for(var i = 0; i < items.length; i++)
	{
		if(i == 0){ result += optionString(items[i], i, "selected") }
		else{	result += optionString(items[i], i); }
	}
	return result;
}

function autoComplete(e)
{
	if( e.which != 40 && e.which != 38 )
	{
		$("#math-words").removeClass("hidden");
		
		var typedText = $("#code-text").text();
		
		var relevantWord =  typedText.split(' ').pop();
		
		$("#math-words").html( fullOptionString( getRelevantWords(relevantWord) ));
	}
}

function replaceText(replacementText)
{
	var typedText = $("#code-text").text();
	var index = typedText.lastIndexOf(" ");
	if(index == null || index == undefined)	{
		index = 1;
	}
	var resultText = typedText.substr(0, index) + " " + replacementText;
	$("#code-text").text(resultText);
	
	var editableDiv = document.getElementById("code-text");
	cursorManager.setEndOfContenteditable(editableDiv);
}

$('body').on('click', '.ac-option', function() {
	replaceText($(this).text());
});

$('#code-text').on( 'keydown', function( e ) {
    if( e.which == 9 || e.which == 13) {
    	e.preventDefault();
        console.log( e.target.href );
        
        replaceText($(".ac-option.selected").text());
    }
} )
.keyup(function(e) {
    if( e.which == 40 ){
    	selectedOption = (selectedOption + 1) % numberOfOptions;
    	$(".ac-option").removeClass("selected");
    	$("#aco" + selectedOption).addClass("selected");
    }
    else if( e.which == 38 ){
    	selectedOption = (selectedOption + numberOfOptions - 1) % numberOfOptions;
    	$(".ac-option").removeClass("selected");
    	$("#aco" + selectedOption).addClass("selected");
    }
    else{
    	autoComplete(e);
    }
    return false;
});
