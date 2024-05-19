var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function () {
    if (started === false) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    var arrayLength = userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(arrayLength - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + ++level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}
