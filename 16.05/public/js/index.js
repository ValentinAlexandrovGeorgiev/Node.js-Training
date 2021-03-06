var Player = function() {

};

Player.prototype.events = function() {
	var that = this;

	$('#add-player').on('click', function(event) {
		event.preventDefault();
		that.addPlayer();
	});

	$('#edit-player').on('click', function(event) {
		let id = $(this).data('id');

		event.preventDefault();
		that.editPlayer(id);
	});

	$('.delete-player').on('click', function(event) {
		let id = $(this).data('id');
		that.deletePlayer(id);
	});

	$('.add-point').on('click', function(event) {
		let id = $(this).data('id');
		that.addPoint(id);
	});
};

Player.prototype.deletePlayer = function(id) {

	$.ajax({
		method: 'DELETE',
		data: {
			id: id
		},
		url: '/player/delete'
	}).done(function(data){
		$('#' + id).remove();
	});
};

Player.prototype.addPoint = function(id) {

	$.ajax({
		method: 'PUT',
		data: {
			id: id
		},
		url: '/player/update/points/' + id + '/1'
	}).done(function(data){
		
		if (!!data.success) {
			$('#' + id + ' .points').html(data.points);
		}
	});
};

Player.prototype.addPlayer = function() {
	var playerData = {
		name: $('.player-name').val(),
		email: $('.player-email').val(),
		password: $('.player-password').val()
	}

	$.ajax({
		method: "POST",
		data: playerData,
		url: '/player/add'
	}).done(function(data) {
		console.log(data);

		if (!!data.success) {
			window.location = '/players'
		}
	});

};

Player.prototype.editPlayer = function(id) {
	var playerData = {
		name: $('#edit-player-name').val(),
		email: $('#edit-player-email').val()
	};

	$.ajax({
		method: "POST",
		data: playerData,
		url: '/player/edit/' + id
	}).done(function(data) {

		if (!!data.success) {
			window.location = '/players'
		}
	});

};

Player.prototype.init = function() {
	this.events();
};

$(document).ready(function() {
	new Player().init();
});