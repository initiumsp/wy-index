var wyIndex = 0;
var nextQuestion = 0;
var showNextItem;
var container = document.getElementById("container");

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.5;
    }, 50);
}

function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.opacity = 0;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.3;
    }, 10);
}

function showQuestion(question) {

    // Display question text
    var p = document.createElement('p');
    var textNode = document.createTextNode(question.text);
    var divSurveyCard = document.createElement('div');
    var divQuestion = document.createElement('div');
    divQuestion.class = "divQuestion";
    p.appendChild(textNode);
    divQuestion.appendChild(p);
    divQuestion.style.display = 'none';
    divSurveyCard.appendChild(divQuestion);
    divSurveyCard.class = "divSurveyCard"
    container.appendChild(divSurveyCard);

    showNextItem = false;

    // Display options
    var divOptions = document.createElement('div');
    divOptions.class = "divOptions";
    divSurveyCard.appendChild(divOptions);
    for (var i=0;i<question.options.length;i++) {
        var option = question.options[i];
        var optionText = option[0];
        var optionWeight = option[1];

        var button = document.createElement('button');
        textNode = document.createTextNode(optionText);
        button.appendChild(textNode);
        button.value = optionWeight;
        divOptions.appendChild(button);

        button.addEventListener("click", function(event){
            wyIndex += parseInt(event.target.value);
            fadeOut(event.target.parentNode.parentNode);
            nextQuestion++;
            showNextItem = true;
        });
    }
    fadeIn(divQuestion);
}

function normalize(index) {
    // Normalize index to a 100-scale.
    return Math.round(index / 75 * 100);
}

function checkAndShowNextItem() {
    if (showNextItem) {
        if (nextQuestion < survey.length) {
            showNextItem = false;
            setTimeout("showQuestion(survey[nextQuestion])", 300);
        } else {
            showNextItem = false;
            wyIndex = normalize(wyIndex);
            var textNode = document.createTextNode('你的廢青指數是：'+wyIndex.toString());
            var divIndex = document.createElement('div');
            divIndex.appendChild(textNode);
            container.appendChild(divIndex);
            fadeIn(divIndex);
        }
    }
}

function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

// determine the questions orders.
survey = shuffle(survey).concat(additionalQuestions);

// Display welcome page
var divWelcome = document.createElement('div');

var textNode = document.createTextNode("測測你的廢青指數");
var h2 = document.createElement('h2');
h2.appendChild(textNode);
divWelcome.appendChild(h2);

var btnStartTest = document.createElement('button');
var textNodeBtn = document.createTextNode('開始測試！');
btnStartTest.appendChild(textNodeBtn);
divWelcome.appendChild(btnStartTest);
container.appendChild(divWelcome);

btnStartTest.addEventListener('click', function(){
    showNextItem = true;
    fadeOut(divWelcome);
});

// Check every 5ms if an option is chosen, and show the appropriate next item
setInterval(checkAndShowNextItem, 5);