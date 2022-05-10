var tab;
var myModal;
var add = true;
var idSquares;

//function qui créer la lecture des tables dans le dashbord 
function init() {

	//function pour l'affichage 
	loadSquares();
	loadSetting();
	loadUser();

	//requet des validation des formulaires pour init des ouverture des tables 
	if (menu_to_open == "user") {
		openUser();
	} else if (menu_to_open == "squares") {
		openPlateau();
	} else if (menu_to_open == "settings") {
		openApplication();
	} else { }

	//////////////////////////
	//gestion de la table user
	/////////////////////////

	//ajout (ADD) de user
	//funtion propre à l'id du bouton "ajouter" pour l'ajout 
	$('#btn_add_form_user').click(function () {

		//appel de la modal 
		myModal2 = new bootstrap.Modal($('#exampleModal2'), {
			keyboard: false
		});
		//récupération du form d'ajout user
		$.ajax({
			method: "POST",
			url: "users/get-form"
		})
		// affichage du form dans la modal 
		.done(function (json) {
			$('#exampleModal2 #exampleModal2Content').html(json);//(.html() : affiche le contenue html du form )
			myModal2.show();//affichage de la modal 
		});
	});

	//modification (UPDATE) de user
	//function propre à la classe du bouton modifier 
	$(document).on('click', '.btn_upd_form_user', function () {

		//appel de la modal  
		myModal2 = new bootstrap.Modal($('#exampleModal2'), {
			keyboard: false
		});
		//récupération du form en fonctin de l'id 
		var id = $(this).data('id');// id 
		//form de mofification 
		$.ajax({
			method: "GET",
			url: "users/get-form/" + id // route avec id 
		})
		// affichage du form dans la modal 
		.done(function (json) {
			$('#exampleModal2 #exampleModal2Content').html(json);//(.html() : affiche le contenue html du form )
			myModal2.show();//affichage de la modal 
		});
	});


	//////////////////////////////
	//gestion de la table setting 
	/////////////////////////////

	// ajout (ADD) dans  SETTING
	//funtion propre à l'id du bouton "ajouter" pour l'ajout 
	$('#btn_add_form_setting').click(function () {

		//appel de la modal 
		myModal2 = new bootstrap.Modal($('#exampleModal2'), {
			keyboard: false
		});
		//récupération du form d'ajout setting
		$.ajax({
			method: "GET",
			url: "setting/get-form"
		})
		// affichage du form dans la modal 
		.done(function (json) {
			$('#exampleModal2 #exampleModal2Content').html(json);//(.html() : affiche le contenue html du form )
			myModal2.show();//affichage de la modal 
		});
	});

	//modification (UPDATE) de setting
	//function propre à la classe du bouton modifier 
	$(document).on('click', '.btn_upd_form_setting', function () {

		//appel de la modal 
		myModal2 = new bootstrap.Modal($('#exampleModal2'), {
			keyboard: false
		});
		//récupération du form en fonctin de l'id 	
		var settingkey = $(this).data('id');// id 
		//form de mofification 
		$.ajax({
			method: "GET",
			url: "setting/get-form/" + settingkey // route avec id 
		})
		// affichage du form dans la modal 
		.done(function (json) {
			$('#exampleModal2 #exampleModal2Content').html(json);//(.html() : affiche le contenue html du form )
			myModal2.show();//affichage de la modal
		});
	});

	//////////////////////////////
	//gestion de la table square
	/////////////////////////////

	//ajout (ADD) de square
	//funtion propre à l'id du bouton "ajouter" pour l'ajout 
	$('#btn_add_form').click(function () {

		//appel de la modal 
		myModal2 = new bootstrap.Modal($('#exampleModal2'), {
			keyboard: false
		});
		//récupération du form d'ajout square
		$.ajax({
			method: "GET",
			url: "squares/get-form"
		})
		// affichage du form dans la modal 
		.done(function (json) {
			$('#exampleModal2 #exampleModal2Content').html(json);//(.html() : affiche le contenue html du form )
			myModal2.show();//affichage de la modal 
		});
	});


	//modification (UPDATE) de square
	//function propre à la classe du bouton modifier
	$(document).on('click', '.btn_upd_form_square', function () {

		//appel de la modal 
		myModal2 = new bootstrap.Modal($('#exampleModal2'), {
			keyboard: false
		});
		//récupération du form en fonctin de l'id 
		var id = $(this).data('id');// id 
		//form de mofification 
		$.ajax({
			method: "GET",
			url: "squares/get-form/" + id // route avec id 
		})
		// affichage du form dans la modal 
		.done(function (json) {
			$('#exampleModal2 #exampleModal2Content').html(json);//(.html() : affiche le contenue html du form )
			myModal2.show();//affichage de la modal
		});
	});

}//fin de la function init();

/////////////////////////////////////////////////////////////////
//function de gestion de l'affichage des données de la table user
/////////////////////////////////////////////////////////////////
function loadUser() {

	//récupération des données du controler 
	$.ajax({
		method: "GET",
		url: "home/users/",
	})
	// gestion de l'affichage des données de la table user
	.done(function (json) { //récupération du json 
		tab = json;
		var html = '';
		//boucle de création de la table user pour une gestion faite en ajax 
		for (var i = 0; i < tab.length; i++) {
			html += '<tr><td>'
				+ tab[i].email + '</td><td>'
				+ tab[i].roles + '</td><td>'
				+ '<button class="btn btn-primary btn_upd_form_user" data-id="' + tab[i].id + '">Modifier</button></td><td>'
				+ '<button class="btn btn-danger" onclick="deleteUser(\''
				+ tab[i].id + '\')">Supprimer</button></td></tr>';
		}
		$('#datas_users').html(html);//envois du code html dans le tbody id 
	});
}

// function DELETE d'un element de la table user 
function deleteUser(id) {
	//appel de la function delete dans le controller 
	$.ajax({
		method: "POST",
		url: "users/delete/" + id,// utilisation de la clé pour delete 
	})
	//lecture de la function listing user 
	.done(function (msg) {
		loadUser();
	});

}


////////////////////////////////////////////////////////////////////
//function de gestion de l'affichage des données de la table setting
///////////////////////////////////////////////////////////////////
function loadSetting() {

	//récupération des données du controler 
	$.ajax({
		method: "GET",
		url: "home/setting/",
	})
	// gestion de l'affichage des données de la table setting
	.done(function (json) { //récupération du json 
		tab = json;
		var html = '';
		//boucle de création de la table setting pour une gestion faite en ajax 	
		for (var i = 0; i < tab.length; i++) {
			html += '<tr><td>'
				+ tab[i].key + '</td><td>'
				+ tab[i].value + '</td><td>'
				+ '<button class="btn btn-primary btn_upd_form_setting" data-id="' + tab[i].key + '">Modifier</button></td><td>'
				+ '<button class="btn btn-danger" onclick="deleteSetting(\''
				+ tab[i].key + '\')">Supprimer</button></td></tr>';
		}
		$('#datas_setting').html(html);//envois du code html dans le tbody id 
	});
}

// function DELETE d'un element de la table setting
function deleteSetting(settingkey) {
	//appel de la function delete dans le controller 
	$.ajax({
		method: "POST",
		url: "setting/delete/" + settingkey,// utilisation de la clé pour delete 
	})
	//lecture de la function listing setting 
	.done(function (msg) {
		loadSetting();
	});

}

////////////////////////////////////////////////////////////////////
//function de gestion de l'affichage des données de la table square 
///////////////////////////////////////////////////////////////////
function loadSquares() {

	//récupération des données du controler 
	$.ajax({
		method: "GET",
		url: "home/squares/",
	})
	// gestion de l'affichage des données de la table square
	.done(function (json) {//récupération du json 
		tab = json;
		var html = "";
		//boucle de création de la table square pour une gestion faite en ajax 
		for (var i = 0; i < tab.length; i++) {
			html += '<tr class="sort" data-id="' + tab[i].id + '" data-sort="' + tab[i].order + '"><td class="index">'
				+ tab[i].order + '</td><td>'
				+ tab[i].name + '</td><td>'
				+ tab[i].type + '</td><td>'
				+ tab[i].description + '</td><td>'
				+ '<button class="btn btn-primary btn_upd_form_square" data-id="' + tab[i].id + '">Modifier</button></td><td>'
				+ '<button class="btn btn-danger" onclick="deleteSquares(\''
				+ tab[i].id + '\')">Supprimer</button></td></tr>';
		}
		$('#datas').html(html);//envois du code html dans le tbody id 
	});
}

// function DELETE d'un element de la table square
function deleteSquares(id) {
	//appel de la function delete dans le controller 
	$.ajax({
		method: "POST",
		url: "squares/delete/" + id,// utilisation de la clé pour delete
	})
	//lecture de la function listing square
	.done(function (msg) {
		loadSquares();
	});

}



////////////////////////////////////////////
//function de gestion de l'ordre des squares 
////////////////////////////////////////////
$(function () {
	// rend le tbody square sortable 
	$("#datas").sortable({

		// function qui update le changement des index
		update: function (event, ui) {
			var squares_order = {};// variable de type objet

			// $(this)selectionne le tbody, children() les enfants "tr" ,. each() effectue la function pour chaque enfant.
			$(this).children().each(function (index) {

				var order_new = index + 1;// varible qui effectue l'ajout en front de plus 1 sur l'index 
				$(this).find('.index').html(order_new);//cible dans la classe(index)et .htmlprend en conpte le changment du text et balise html
				$(this).data('sort', order_new);//cible le data-sort de chaque "tr"

				squares_order[$(this).data('id')] = order_new;// créer une variable qui inclue id et le order 
			})
			//envois des modifications pour le traitment en bdd dans le controller 
			var form_data = {
				table: squares_order,
			};
			// envois en ajax 
			$.ajax({
				type: "POST",
				data: form_data,
				dataType: 'json',
				url: "squares/order/",
			})

		}
	});
})








