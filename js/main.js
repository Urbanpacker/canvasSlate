"use strict";
						        	
/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

var c = document.getElementById('mon_canvas');
var ctx = c.getContext('2d');

// var positionX ;
// var positionY ;
var previousPositionX;
var previousPositionY;

// Couleur et dimension du pinceau
var drawColor = '#000' ;
var size = 5; // taille par défaut du pinceau
var thin =  document.getElementById("thin");
var normal = document.getElementById("normal");
var large = document.getElementById("large");

var pipet = document.getElementById('pipet');
var eraser = document.getElementById('eraser');

var jscolor = document.getElementById('jscolorId');

var mouseOut;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

// Récupération de la couleur depuis le colorpicker
function getColorFromPipet(){
    var colorFromPipet = jscolor.style.backgroundColor;
    drawColor = colorFromPipet;
}

// Fonction de sélection d'une taille de pinceau : 5, 10 ou 15 pixels    
function selectSize(event){
    
    switch(this.id){
        case "thin":
            size = 5;
            break;
        case "normal":
            size = 10;
            break;
        case "large":
            size = 25;
            break;
    }
    event.preventDefault();
};

//Fonction de récupération d'un code couleur CSS depuis un disque de couleur
    var colorDisks = document.querySelectorAll("div.couleurs div");
    for(var i = 0, j = colorDisks.length ; i < j ; i++){
        colorDisks[i].addEventListener("click", function(){
            drawColor = this.dataset.color;    
            console.log(drawColor);
        });
    }
    
// Equivalent de la fonction précédente en jQuery : 
/*
$(function(){
        $("div.couleurs div").click(function(event){
        drawColor = $(this).data("color");
    });
});
*/

// Fonction de dessin au pinceau
function draw(e){
    
    var positionX = e.clientX -100 ;
    var positionY = e.clientY - 130;
    
    c.addEventListener("mouseout", function(){
        mouseOut = true;
    });
    
    if(mouseOut){
        previousPositionX = positionX ;
        previousPositionY = positionY ; 
    }
    
    if(e.buttons === 1){
        ctx.strokeStyle = drawColor;
        ctx.beginPath();
        ctx.moveTo(previousPositionX,previousPositionY);
        ctx.lineTo(positionX,positionY);
        ctx.fillStyle = drawColor;
        ctx.lineWidth = size;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        mouseOut = false;
    }
    
    previousPositionX = positionX ;
    previousPositionY = positionY ;
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
// Récupération de la couleur courante du colorpicker quand on clique sur celui-ci
jscolor.addEventListener("click", getColorFromPipet);

// Récupération d'une couleur depuis le colorpicker quand on en sélectionne une nouvelle
jscolor.addEventListener("change",function(){
    getColorFromPipet();
});

// Choix d'un taille de pinceau
thin.addEventListener("click",selectSize);
normal.addEventListener("click",selectSize);
large.addEventListener("click",selectSize);

// Fonction principale de dessin
c.addEventListener("mousemove", draw);

// Effacement de l'ensemble du canvas
eraser.addEventListener("click", function (event){
    ctx.clearRect(0, 0, 800, 600);
    event.preventDefault();
});

// Affichage de la pipette
pipet.addEventListener("click", function(event){
    jscolor.classList.toggle('hidden');
    event.preventDefault();
});


