var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// to detect when a keyboard key has been pressed
// when that happens for the first time, call nextSequence()
// to keep track of whether if the game has started or not
// so nextSequence() is called ont eh first keypress.
var started = false;
var level = 0;
$(document).keydown(function(){
    if(!started){
        // when the game has started, change h1 title to say "Level 0"
        nextSequence();
        started = true;
    }
});


function nextSequence(){

    // once nextSequence() is triggered, 
    // reset userClickedPattern to and empty array 
    // ready for the next level
    userClickedPattern = [];

    // to increase the level by 1 every time nextSequence() is called
    level++;
    // to update the title with the change in the value of level
    $("#level-title").text("Level "+level);

    // to generate a new random number between 0 and 3
    // and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random()*4);

    // to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColours[randomNumber];

    // to add the new randomChosenColour to the end of the gamePattern
    gamePattern.push(randomChosenColour);

    // to select the button with the same id as the randomChosenColour
    // and animate a flash to the button selected
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // to play the sound for the button colour selected
    // var sound = new Audio("sounds/"+randomChosenColour+".mp3");
    // sound.play();

    playSound(randomChosenColour);
} // END of nextSequnce()


// to detect when any of the buttons are clicked
// and trigger a handler function
$(".btn").click(function(){
    // to create a new variable called userChosenColour
    // and store the id of the button that got clicked
    var userChosenColour = $(this).attr("id");
    console.log(userChosenColour);
    // cf) this vs. $(this)
    // The raw HTML element vs. The element with jQuery superpowers
    // this.id vs. $(this).attr("id")

    // to add the contents of the variable userChosenColour
    // to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    // in the same way we played sound in nextSequence()
    // when a user clicks on a button,
    // the corresponding sound should be played
    playSound(userChosenColour);

    animatePress(userChosenColour);
    
    // to call checkAnwer() after a user has clicked and chosen their answer
    // passing in the index of the last answer in the user's sequence.
    // e.g. If the user has pressed red, green, red, yellow,
    // the index of the last answer is 3.
    checkAnswer(userClickedPattern.length-1);
});

// to create a new function called playSound()
// that takes a single input parameter called name
function playSound(name){
    // to take the code we used to play sound in the nextSequence() function
    // and move it to playSound()
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

// to create a new function called animatePress()
// it should take a single input parameter called currentColour
function animatePress(currentColour){
    // to add pressed class to the button that gets clicked 
    $("#"+currentColour).addClass("pressed");

    // to remote the pressed class after a 100 miliseconds
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){

    // to check if the most recent user answer is the same as the game pattern.
    // If so then log "success", otherwise log "wrong"
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        
        // to check that the user has finished their sequence
        // with another if statement.
        if (userClickedPattern.length === gamePattern.length){
            // to call nextSequence() after a 1000 milisecond delay
            setTimeout(function(){
                nextSequence();
            },100)
        }

    }else{
        console.log("wrong");
        // to play the sound called wrong.mp3
        playSound("wrong");
        
        // to apply a class called "game-over" to the body of the website
        // and then remove it after 200 milliseconds
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        // to change the h1 title to say
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}