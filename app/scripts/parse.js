	Parse.$ = jQuery;

	Parse.initialize("vntCtDn8oflM08j1SD0sRWMdh15gbdoVPJ6jvfc0", "qd0ZpKz5gunLVSz8UXmpcLM8jqWAZs2rSUA6b6MV");

	var Book = Parse.Object.extend("Books", {

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

	availableCollection.fetch({
	  success: function(collection) {
	  	console.log('successful fetch')
	    collection.each(function(object) {
	      console.log(object);
	    });
	  }
	})

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

	unavailableCollection.fetch({
	  success: function(collection) {
	  	console.log('successful fetch')
	  	console.log(collection)
	    collection.each(function(result) {
		  	console.log('result',result)
	      	new unavailableView(result)
	    });
	  }
	})

	var availableView = Parse.View.extend({
		availableTemplate: _.template($('#Available').text()),
		initialize: function() {
			$("#Available").append(this.el)
			this.render()
			console.log('initialized available')
		},
		render: function() {
			console.log('fetched')
			this.$el.append(this.availableTemplate({book: this.model}))
		}
	})

	var unavailableView = Parse.View.extend({
  		unavailableTemplate: _.template($('#Unavailable').text()),
		initialize: function() {
			$("#Unavailable").append(this.el)
			this.render()
			console.log('initialized unavailable')

		},
  		render: function() {
  			console.log('fetched')
    		this.$el.append(this.unavailableTemplate({book: this.model}));
  		}
	})

	
