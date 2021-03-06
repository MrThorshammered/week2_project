$(document).ready(function() {

    soundManager.defaultOptions = {
              
      multiShot: true,    //so that I can have the same sound played multiple times 
      multiShotEvents: true
    };

    soundManager.setup({
          url: '../soundManager/swf/',   //this is the setup for the background music that plays continuously 
          onready: function() {

      var mySound = soundManager.createSound({
          id: 'aSound',
          url: '../project/sounds/8bitbackground.mp3'
      })
          soundManager.setVolume('aSound', 6)
          mySound.play();
      }
 });


  function startSound(){
      soundManager.createSound({   //makes the vroom sound
          id: 'start',
          url: '../project/sounds/humveesound.mp3'
     }).play()
  }



    var building1Timer;  //building battle timer
    var building2Timer;  //building battle timer

    var tankOneTimer;    //tank battle timer
    var tankTwoTimer;   //tank battle timer

    var tankChecker1;   //checks that the tank is still alive
    var tankChecker2;  //checks that the tank is still alive

    var buildingHealth1 = [50];//assigning a health value to 1st garage 
    var buildingHealth2 = [50];//assigning a health value to 2nd garage

    var tankHealth1 = [10];//for assigning a health value to 1st tank
    var tankHealth2 = [10];//for assigning a health value to 2nd tank

  var attack1 = function(){//how the attack assigns a value to itself
	     return Math.round(Math.random()*5);
   };

  var attack2 = function(){//how the attack assigns a value to itself
       return Math.round(Math.random()*5);
    };

  // timer to check who's won the battle
  var didTankOneWin = function(){
       tankOneTimer = setInterval(tank1Attacked,1000);
    };

  var didTankTwoWin = function(){
       tankTwoTimer = setInterval(tank2Attacked,1000);
    };

  //to check if the tank has hit a building
  var hasABuildingBeenHit = function(team){
        building1Timer = setInterval(function(){
          buildingColide(team)
        },50);
    };

  //the interval to start the attack process on a building
  var buildingIsBeingAttacked = function(){
      building2Timer = setInterval(buildingAttack1,1000);
    }

  // what happens when tank 1 is attacked
  var tank1Attacked = function(){
	var attacked = tankHealth1[0]-attack2();

      tankHealth1.unshift(attacked);

      console.log(tankHealth1[0] + " tank ones health");
  $('h4#tankOneComentary').html(tankHealth1[0] + " tank health left");
      if (tankHealth1[0] <= 0){
    	 $('.team1').remove();

           tankTeam2Right();

       $('h4').html('tank 2 survived');
        hasABuildingBeenHit($('.team2'));

        clearInterval(tankOneTimer);
        clearInterval(tankTwoTimer);
      }
  };

  // what happens when tank 2 is attacked
  var tank2Attacked = function(){
	var attacked = tankHealth2[0]-attack1();

       tankHealth2.unshift(attacked);
       console.log(tankHealth2[0] + " tank two's health");

  $('h4#tankTwoComentary').html(tankHealth2[0] + " tank health left");
    if (tankHealth2[0] <= 0){
    	$('.team2').remove();

        tankTeam1Right();

      $('h4.whoSurvived').html('tank 1 survived');
        hasABuildingBeenHit($('.team1'));

        clearInterval(tankOneTimer);
        clearInterval(tankTwoTimer);
      }
  };

  // colission detection for the two tanks and get them to stop
  var colided = function(){
	   if ($('.team1').position().left >= $('.team2').position().left){
	     	console.log('tanks have colided');
          clearInterval(tankChecker1);
		      clearInterval(tankChecker2);

		  $('.team1').stop();
		  $('.team2').stop();

          didTankOneWin();
          didTankTwoWin();
	     }
   };

  // checking to see if tank has stopped at buildings
  var buildingColide = function(team){
    
    if(team.position().left <= 200 || team.position().left > window.innerWidth-200){

        console.log('tank TBD is attacking');

        team.stop();

        clearInterval(building1Timer);

        buildingAttack1();
        buildingIsBeingAttacked();
      }; 
  };

  //buildings being attacked
  var buildingAttack1 = function(team){
    if($('h4').html() === "tank 1 survived"){

  var attacked1 = buildingHealth2[0]-attack1();
      buildingHealth2.unshift(attacked1);

      console.log(buildingHealth2[0] + " building two's health");

   $('h4#tankTwoComentary').html(buildingHealth2[0] + " building health left");
        if (buildingHealth2[0] <= 0){
          $('img#garage2').remove()

            clearInterval(building2Timer);
          $('h4.whoSurvived').html("team 1 won mofo");
            }

          }else if($('h4').html() === "tank 2 survived"){

  var attacked2 = buildingHealth1[0]-attack2();
      buildingHealth1.unshift(attacked2);

        console.log(buildingHealth1[0] + " building one's health");

   $('h4#tankOneComentary').html(buildingHealth1[0] + " building health left");
        if(buildingHealth1[0] <= 0){
          $('img#garage1').remove()

            clearInterval(building2Timer);
          $('h4.whoSurvived').html("team 2 won mofo");
      }
    }
  };

    // what happens when a key is pressed and how it knows which key is pressed
  $('body').on('keypress', function(e){
	  console.log(e.keyCode);
	  switch(e.keyCode){

  //what to do when w is pressed
	 case 119:
	  console.log('w has been clicked');
	$('body').append('<img class="team1" src="images/king_tiger.gif">');
    tankTeam1Right();
    tankChecker1 = setInterval(colided, 50);
    startSound();
    break;

   //what to do when l is done
   case 108:
    console.log('L has been clicked');
    $('body').append('<img class="team2" src="images/tank_2.gif">');
    tankTeam2Right();
    tankChecker2 = setInterval(colided, 50);
    startSound();
   break;

   default:
    console.log('press the right button');
   }
 });


   // to make tank left to move right
   function tankTeam1Right() {
    $(".team1").animate({left: "+=1100"}, 5000, "swing");
  }

   // to make tank right to move left
   function tankTeam2Right() {
    $(".team2").animate({right: "+=1100"}, 5000, "swing");
  }

});//end of doc onload