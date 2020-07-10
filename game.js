var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var level = 0;
var a = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name) {
    var sounds = new Audio("sounds/" + name + ".mp3");
    sounds.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout( function() {
        $("#" + currentColor).removeClass("pressed");    
    }, 100);
}

$(document).keydown(function() {
    if(a < 1) {
        nextSequence();
        a++;
    }
});

function checkAnswer(currentLevel) {

        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if(userClickedPattern.length === gamePattern.length) {
                setTimeout( function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            
            setTimeout( function() {
                $("body").removeClass("game-over");    
            }, 200);
            startOver();
        }
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    a = 0;
}