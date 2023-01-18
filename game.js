var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red","blue","green","yellow"];

var gameStated = false;
var level = 0;

    $(".game-over-btn").on("click",function(){
        $(".out").addClass("hidden");
        if(!gameStated){
            setTimeout(function(){
                nextSequence();
                gameStated = true;
                $("#level-title").text("Level " + level);
            }, 500);
            
        }   
    });

    $(".btn").on("click",function(){
         if(gameStated){
            var userChooseColor = $(this).attr("id");
        userClickedPattern.push(userChooseColor);
        console.log(userClickedPattern);
        playSound(userChooseColor);
        animatePress(userChooseColor);
        checkAnswer(userClickedPattern.length - 1);
        }
        
    });

    function checkAnswer (num){
    
        if(gamePattern[num] === userClickedPattern[num]){
            if(userClickedPattern.length === gamePattern.length){
                

                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            $("body").addClass("game-over");
            $(".out").removeClass("hidden");
            $(".game-over-h").text("Game Over");
            playSound("wrong");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },100);
            level = 0;
            gameStated = false;
            gamePattern = [];
            
        }
}
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChooseColor = buttonColor[randomNumber];
    gamePattern.push(randomChooseColor);
    playSound(randomChooseColor);

    $("#" + randomChooseColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("Level " + level);
    console.log(gamePattern);
    
}
function playSound(name){
    var sound  = new Audio("sounds/" + name + ".mp3");
    sound.play();
}
function animatePress (currenColor) {
    $("." + currenColor).addClass("pressed");
    setTimeout(function(){
        $("." + currenColor).removeClass("pressed");
    },100);
    
}

