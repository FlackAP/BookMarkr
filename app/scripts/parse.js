$(document).ready(function(){

	Parse.$ = jQuery;

	Parse.initialize("vntCtDn8oflM08j1SD0sRWMdh15gbdoVPJ6jvfc0", "qd0ZpKz5gunLVSz8UXmpcLM8jqWAZs2rSUA6b6MV");

	var Book = Parse.Object.extend("Book", {

		defaults: {

			available: true
		},

		initialize: function(){
			console.log("great job! made a class")
		}

	});

	var AvailableCollection = Parse.Collection.extend({
  		model: Book,
  		query: (new Parse.Query(Book)).equalTo("available", true),
  		initialize: function() {
			console.log('cool new collection')
			this.on('add', function(item){
				new availableView( {model: Book})
			})
		},
	});
	var availableCollection = new AvailableCollection();

	var UnavailableCollection = Parse.Collection.extend({
  		model: Book,
  		query: (new Parse.Query(Book)).equalTo("available", false),
  		initialize: function() {
			console.log('cool new collection')
			this.on('add', function(item){
				new unavailableView( {model: Book})
			})
	},
	});
	var unavailableCollection = new UnavailableCollection();

	var availableView = Parse.View.extend({

	})

	var unavailableView = Parse.View.extend({

	})
	

})
	
