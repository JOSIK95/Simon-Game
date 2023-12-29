const buttonColors = ["red", "blue", "green", "yellow"];
let userCLickedColors = [];
let gamePattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userCLickedColors.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userCLickedColors.length - 1);
});

const nextSequence = function () {
    userCLickedColors = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomColor);

};
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userCLickedColors[currentLevel]) {
        $("#level-title").text("Correct!");
        if (userCLickedColors.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 700);
        }

    }else{
        $("#level-title").text("Oh no that was wrong! Press any key play again!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }),200;
        startOver();
    };
};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

function startOver(){
    level = 0;
    gamepattern =[];
    started = false;
};