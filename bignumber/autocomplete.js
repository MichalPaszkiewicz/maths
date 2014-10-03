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
	var result = "";
	
	for(var i = 0; i < items.length; i++)
	{
		if(i == 0){ result += optionString(items[i], i, "selected") }
		else{	result += optionString(items[i], i); }
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

function SetCursorEnd(tID) {
    tID += "";
    $(tID).focus();
    var t = $(tID).val();
    if (t.length == 0) { return; }
    $(tID).val("");
    $(tID).val(t);
    $(tID).scrollTop($(tID)[0].scrollHeight); 
}

function replaceText(replacementText)
{
	var typedText = $("textarea").val();
	var index = typedText.lastIndexOf(" ");
	if(index == null || index == undefined)	{
		index = 1;
	}
	var resultText = typedText.substr(0, index) + " " + replacementText;
	$("textarea").val(resultText);
	SetCursorEnd("#code-text");
}

$('body').on('click', '.ac-option', function() {
	replaceText($(this).text());
});

$('textarea').on( 'keydown', function( e ) {
    if( e.which == 9 ) {
    	e.preventDefault();
        console.log( e.target.href );
        
        replaceText($(".ac-option.selected").text());
    }
    else if( e.which == 40 ){
    	e.preventDefault();
    	var IDed = $(".ac-option.selected")[0].id;
    	var index = parseInt(IDed[3]) + 1;
    	$(".ac-option").removeClass("selected");
    	$("#aco" + index).addClass("selected");
    }
    else if(e.which == 38){
    	e.preventDefault();
    	var IDed = $(".ac-option.selected")[0].id;
    	var index = parseInt(IDed[3]) - 1;
    	$(".ac-option").removeClass("selected");
    	$("#aco" + index).addClass("selected");
    }
} );
