	Parse.$ = jQuery;

	Parse.initialize("vntCtDn8oflM08j1SD0sRWMdh15gbdoVPJ6jvfc0", "qd0ZpKz5gunLVSz8UXmpcLM8jqWAZs2rSUA6b6MV");

	var Book = Parse.Object.extend("Books", {
		defaults: {
			user: "n/a"
		},

		initialize: function(){
			console.log("great job! made a class")
		}

	});

	var AvailableCollection = Parse.Collection.extend({
  		model: Book,
  		query: (new Parse.Query(Book)).equalTo("available", true),
  		initialize: function() {
			console.log('cool new available collection')
			this.on('add', function(item){
				new availableView( {model: Book})
			})
		}
	});
	var availableCollection = new AvailableCollection();


	var UnavailableCollection = Parse.Collection.extend({
  		model: Book,
  		query: (new Parse.Query(Book)).equalTo("available", false),
  		initialize: function() {
			console.log('cool new unavailable collection')
			this.on('add', function(item){
				new unavailableView( {model: Book})

			})
		}
	});
	var unavailableCollection = new UnavailableCollection();



	var availableView = Parse.View.extend({
		tagName:'tr',

		template: _.template($('#available').text()),

		events: {
			"click .check-out" : "checkout"
		},

		initialize: function() {
			$("#available-view").append(this.el)
			console.log('initialized available')
			this.render()
		},
		render: function() {
			console.log('fetched available')
			this.$el.append(this.template({result:this.model}))
		},

		checkout: function() {
			console.log(' checking out ' + this.model.get('title'))

		}
	})

	var unavailableView = Parse.View.extend({
  		tagName: 'tr',

  		template: _.template($('#unavailable').text()),

		initialize: function() {
			$("#unavailable-view").append(this.el)
			console.log('initialized unavailable')
			this.render()
		},
  		render: function() {
  			console.log('fetched unavailable')
    		this.$el.append(this.template({result: this.model}))
  		}
	})

	unavailableCollection.fetch({
	  success: function(collection) {
	  	console.log('successful fetch')
	  	console.log(collection)
	    collection.each(function(result) {
		  	console.log('result',result)
	      	new unavailableView({model: result})
	    })
	  }
	})

	availableCollection.fetch({
	  success: function(collection) {
	  	console.log('successful fetch')
	    console.log(collection)
	    collection.each(function(result) {
		  	console.log('result',result)
	      	new availableView({model: result})
	    })
	  }
	})
	
