//variable globla 
var tab;

////////////////////////////////////////////////////////////
//gestion des conteurs de game (nombre de joueur & de tours)
///////////////////////////////////////////////////////////

//création des buttons plus et moin 
jQuery('<div class="quantity-nav"><button class="quantity-button quantity-up">&#xf106;</button><button class="quantity-button quantity-down">&#xf107</button></div>').insertAfter('.quantity input');

//function général des compteurs
jQuery('.quantity').each(function () {

  //variable et attribue 
  var spinner = jQuery(this),
    input = spinner.find('input[type="number"]'),
    btnUp = spinner.find('.quantity-up'),
    btnDown = spinner.find('.quantity-down'),
    min = input.attr('min'),
    max = input.attr('max');

  //function plus sur le compteur 
  btnUp.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

  //function moin sur le compteur 
  btnDown.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

});//fin de la gestion des compteur 

/////////////////////////////////////
// gestion du dé numérique annimation 
/////////////////////////////////////

//function propre à l'id du boutton lancer 
$(document).on("click", "#roll", function () {

  //variable constante 
  const dice = document.querySelector('.dice');//valeur des class du dée 
  const diceButton = document.getElementById('roll');//valeur de l'id du boutton 

  //variable qui fais le jeu de la rotation  
  const rotate_face = {
    "1": { "x": 900, "y": 900 },
    "2": { "x": 180, "y": 720 },
    "3": { "x": 540, "y": 630 },
    "4": { "x": 900, "y": 1170 },
    "5": { "x": 1350, "y": 630 },
    "6": { "x": 810, "y": 1170 },
  };

  //varible de selection entre 1 et 6
  const min = 1;
  const max = 6;


  //function qui permet d'évaluer le nombre de passage sur les faces du dé
  // var res = {
  //   "1" : 0,
  //   "2" : 0,
  //   "3" : 0,
  //   "4" : 0,
  //   "5" : 0,
  //   "6" : 0,
  // };

  //for qui effectue l'action 
  // for(var i = 0; i < 1000; i++){
  //   var face = Math.floor(Math.random() * ((max+1)-min)) + min;
  //   res[face]++;
  // }

  // console.log(res);
  // return;

  //function de l'action du button lancer 
  diceButton.onclick = function () {

    //gestion de l'affichage des buttons en None et de block pour la div timer 
    document.getElementById('roll').style.display = "none"; //button disparais 
    document.getElementById('timer').style.display = "block";// le timer est vissible 

    //annimation du dé 
    var face = Math.floor(Math.random() * ((max + 1) - min)) + min;
    dice.style.transform = 'rotateX(' + rotate_face[face].x + 'deg) rotateY(' + rotate_face[face].y + 'deg)';
    dice.setAttribute("data-current-face", face);
    //affichage en console de la face visuel 
    //console.log(dice.getAttribute("data-current-face", face));

    //fonction qui ce joue à la fin de l'annimation 
    $('.dice').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function (event) {
      //variable du timer 
      var counter = 5;
      var intervalId = null;

      //function de fin du timer 
      function finish() {

        //function qui arréte le déconte 
        clearInterval(intervalId);

        //envoie de la donnée du résulta du dé 
        var form_data = { dice: dice.getAttribute("data-current-face", face) };//valeur du dée
        //affichge de la valeur en console 
        // console.log(form_data);

        //envoie en ajax au controller pour gestion des données 
        $.ajax({
          type: "POST",
          data: form_data,
          dataType: 'json',
          url: "game/result/",
        })
          //récupération du slide4 en json 
          .done(function (json) {
            initGame();
            console.log(initGame());
            $('#slide4').html(json.slide4);
          });

        //exécution automatique du swipe horizontal du slide3 à slide4
        swiper_horizontal_2.slideNext();
        
      }

      //function du déconte du timer 
      function bip() {

        //action de la function 
        counter--;

        //condition de fin de compteur et de la lecture de la function finish()
        if (counter == 0) finish();
        else {
          document.getElementById("timerScore").innerHTML = counter;
        }
      }

      //function de début de des actions
      function start() {

        //joue l'interval du timer
        intervalId = setInterval(bip, 1000);

      }

      //lecture de start ()
      start();

    });
  };
});//fin la gestion du dé 



///////////////////////////////////////////////
// gestion de la modal des régle du jeu de game 
//////////////////////////////////////////////

//effectue la function de l'affichage de la modal régle du jeu 
$('#ruleModal').click(function () {

  //appel de la modal 
  myModal3 = new bootstrap.Modal($('#exampleModal3'), {
    keyboard: false
  });

  //récupération des données html du controller par ajax 
  $.ajax({
    method: "GET",
    url: "game/get-setting/"
  })
    //récupération du twig en json dans le controller 
    .done(function (json) {
      $('#exampleModal3 #exampleModal3Content').html(json);//envois du code html dans la modal 
      myModal3.show();//lecture de la modal 
    });
});

/////////////////////////////////
// gestion de la modal des score
////////////////////////////////

//effectue la function de l'affichage de la modal des scores 
$(document).on("click", ".score1Modal", function () {

  //appel de la modal 
  myModal3 = new bootstrap.Modal($('#exampleModal3'), {
    keyboard: false
  });

  //récupération des données html du controller par ajax 
  $.ajax({
    method: "GET",
    url: "game/get-score/"
  })
    //récupération du twig en json dans le controller 
    .done(function (json) {
      var title = "Score";// variable qui prend la valeur string du titre de la modal 
      $('#exampleModal3 #exampleModal3Content').html(json);//affichage du twig en json 
      $('#exampleModal3 #exampleModal3Title').html(title);//affichage de la variable twig 
      myModal3.show();//lecture de la modal score 
    })
});


///////////////////////////////////////////////////
// function de la récupération du nombre de joueur
/////////////////////////////////////////////////
function numberPlayer() {

  var nomberPlayer = document.getElementById("player").value; //variable qui prend la valeur du compteur slide1 nombre de joueur 

  //condition pour la création de la liste des joueurs (l'accordion slide2)
  if (nomberPlayer != 0) {
    var accordion = "";//variable d'insertion du bodyaccordion 

    //boucle par rapport au nombre de joueur
    for (var i = 1; i <= nomberPlayer; i++) {
      var html = '<input type="text" id="fname' + [i] + '" name="fname' + [i] + '" value="Joueur ' + i + '"><br>';//création des inputs
      accordion += '<p>' + html + '</p>';
    }
    $('#accordionText').html(accordion);//affichage de la variable 
  } else {
    console.log('null');
  }
}


//gestion et envoi des données en ajax pour la création de la session du jeu
$("#play").click(function (e) {

  //variable qui récupére les données des joueurs et des tours 
  var form_data = {
    players: $("#accordionText").serializeArray(),
    turns: $('#numberTurn').val(),
  };
  //envoie en json des données au controller 
  $.ajax({
    type: "POST",
    data: form_data,
    dataType: 'json',
    url: "game/session/",
  })
    //récupération des données traiter et affichage du slide3 
    .done(function (json) {
      initMap();
      $('#slide3').html(json);
    });

});


//gestion du dérouler de la partie jusqu'a la fin du jeu entre slide3 et slide4
$(document).on("click", "#bouclePlayer", function () {

  //récupération des données 
  $.ajax({
    method: "POST",
    url: "game/session/"
  })
    //récupération des données json 
    .done(function (json) {
      $('#slide3').html(json);//affichage de html d'un nouveau joueur 
      swiper_horizontal_2.slideTo(0, 100);//function précédente du swiper
      
      
    })
});



//gestion de la création des resulta de fin de partie 
$(document).on("click", "#finishPlay", function () {

  //récupération de la page
  $.ajax({
    method: "POST",
    url: "game/finish/"
  })
    //récupération des donées json
    .done(function (json) {
      $('#slide5').html(json);//affichage du résultat
      swiper_vertical.slideNext();//effectue le swiper vertical slide5
    })
});



//Renvois le joueur au début du jeu
$(document).on("click", "#rePlay", function () {
  window.location.href = 'game/'; //renvoie le href (URL) de la page en cours       
});




/////////////////////////// api facebook //////////////////////////////
//////////////////////////capture slide5 pour affichage dans le partage 
// $(function() { 
//   $("#btnSave").click(function() { 
//       html2canvas($("#widget"), {
//           onrendered: function(canvas) {
//               theCanvas = canvas;
//               document.body.appendChild(canvas);

//               canvas.toBlob(function(blob) {
//         saveAs(blob, "Dashboard.png"); 
//       });
//           }
//       });
//   });
// }); 

//  $(document).on("click","#facebook",function(){
//    html2canvas($("#capture"), {
//      onrendered: function(canvas) {
//          theCanvas = canvas;
//          document.body.appendChild(canvas);
//              canvas.toBlob(function(blob) {
//        saveAs(blob, "capture.png"); 
//      });
//          }
//      })
//  });


function takeshot() {
  let div =
    document.getElementById('capture');
  // Use the html2canvas
  // function to take a screenshot
  // and append it
  // to the output div
  html2canvas(div).then(
    function (canvas) {
      document
        .getElementById('output')
        .appendChild(canvas);
    })
}




















