//GESTION DU MENU ADMINISTRATEUR (dashboard // home)

//sildebar 
//ouverture de la sildebar 
function w3_open() {
  document.getElementById("main").style.marginLeft = "10%";
  document.getElementById("mySidebar").style.width = "15%";
  document.getElementById("mySidebar").style.display = "block";
}

//fermeture de la slide bar 
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
}

/////////////////////////////////////////////////////////////
//gestionnaire de l'affichage des tables user,setting,square
////////////////////////////////////////////////////////////

//ouverture de user
function openUser() {
  document.getElementById("tableUser").style.display = "block";
  document.getElementById("tableApplication").style.display = "none";
  document.getElementById("tablePlateau").style.display = "none";
}

//fermeture de user
function closeUser() {
  document.getElementById("tableUser").style.display = "none";
}

//ouverture de setting 
function openApplication() {
  document.getElementById("tableApplication").style.display = "block";
  document.getElementById("tableUser").style.display = "none";
  document.getElementById("tablePlateau").style.display = "none";
}

//fermeture de setting 
function closeApplication() {
  document.getElementById("tableApplication").style.display = "none";
}

//ouverture du square
function openPlateau() {
  document.getElementById("tablePlateau").style.display = "block";
  document.getElementById("tableUser").style.display = "none";
  document.getElementById("tableApplication").style.display = "none";
}

//femeture de square
function closePlateau() {
  document.getElementById("tablePlateau").style.display = "none";
}




