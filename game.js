 var gamePattern =[];

 var userClickedPattern =[];
 
 var buttonColours = ["red", "blue", "green", "yellow"];

 var started = false;

 var level = 0;

 $(document).keypress(function myFunction(){
    if(!started){
        $("#level-title").text("Level "+level); 
        nextSequence();
        started=true;
    }

 });


 
 function nextSequence(){
 var randomNumber = Math.floor(Math.random() * 4);

 var randomChosenColour = buttonColours[randomNumber];

 gamePattern.push(randomChosenColour);

 $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
 

 level++;
 $("#level-title").text("Level " + level);

 userClickedPattern =[];

};


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
var audio = new Audio('sounds/'+ name +'.mp3');
 audio.play();
}

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);


}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }

    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
     $("#level-title").text("Game Over😔.Your score-"+level +" Press Any KEY to Restart.");

        startOver();
    }
    
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}






