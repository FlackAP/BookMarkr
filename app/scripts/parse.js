	Parse.$ = jQuery;

	Parse.initialize("vntCtDn8oflM08j1SD0sRWMdh15gbdoVPJ6jvfc0", "qd0ZpKz5gunLVSz8UXmpcLM8jqWAZs2rSUA6b6MV");

	var Book = Parse.Object.extend("Books", {
		defaults: {
			"user": "n/a"
		},

		initialize: function(){
			console.log("great job! made a class")
		}

	});

	var AvailableCollection = Parse.Collection.extend({
  		model: Book,
  		query: (new Parse.Query(Book)).equalTo("available", true),
  // 		initialize: function() {
		// 	console.log('cool new available collection')
		// 	this.on('add', function(item){
		// 		new availableView( {model: item})
		// 	})
		// }
	});
	var availableCollection = new AvailableCollection();


	var UnavailableCollection = Parse.Collection.extend({
  		model: Book,
  		query: (new Parse.Query(Book)).equalTo("available", false),
  // 		initialize: function() {
		// 	console.log('cool new unavailable collection')
		// 	this.on('add', function(item){
		// 		console.log("Book is" +Book )
		// 		new unavailableView( {model: item})

		// 	})
		// }
	});
	var unavailableCollection = new UnavailableCollection();

	// 
	availableCollection.on('change', function(book){
		new availableView({model:book})
	})


	unavailableCollection.on('add', function(book){
		new unavailableView({model:book})
	})



	var availableView = Parse.View.extend({
		tagName:'tr',

		template: _.template($('#available').text()),

		events: {
			"click .check-out" : "checkout"
		},

		initialize: function() {
			$("#js-available-tbody").append(this.el)
			 this.on('add', this.render, this);
			console.log('initialized available')
			this.render()
		},
		render: function() {
			console.log('fetched available')
			this.$el.append(this.template({result:this.model}))
		},

		checkout: function() {
			console.log(' checking out ' + this.model.get('title'))
			new checkoutView({model: this.model})
		}

	})

	var unavailableView = Parse.View.extend({
  		tagName: 'tr',

  		events: {
  			"click .check-in": "checkIn"
  		},

  		template: _.template($('#unavailable').text()),

		initialize: function() {
			console.log("abc", $("#js-unavailable-tbody"))
			$("#js-unavailable-tbody").append(this.el)
			console.log('initialized unavailable')
			this.render()
		},
  		render: function() {
  			console.log('fetched unavailable')
    		this.$el.append(this.template({result: this.model}))
  		},

  		checkIn: function() {
  			this.model.save({available: true, user: "none"})
  			availableCollection.add(this.model)
  			unavailableCollection.remove(this.model)
  			rerenderCollection(availableCollection, availableView, $('#js-available-tbody'))

  			$('.toggle').click()
  		}
	})

	var checkoutView = Parse.View.extend({

		events: {
			"click .confirm": "saveNewUser"
		},

		template: _.template($('#checkout-modal').text()),

		initialize: function () {
			$('.modal').html('')
			$('.modal').append(this.el)
			console.log('cool you\'re checkin\' '+  this.model.get('title') +" out")
			this.render()
		},

		render: function() {
			$('.modal').addClass('active')
			console.log('rendering checkout for'+  this.model.get('title'))
			this.$el.append(this.template({result: this.model}))
		},

		saveNewUser: function(){
			console.log(this.model)
      		this.model.save({user: $('.user-input').val(), available: false});
      		unavailableCollection.add(this.model)
  			availableCollection.remove(this.model)
  			rerenderCollection(unavailableCollection, unavailableView, $('#js-unavailable-tbody'))

      		$('.modal').remove()
      		$('.toggle').click()
		}
	})

	unavailableCollection.fetch({
	  success: function(collection) {
	  	console.log('successful fetch')
	  	console.log(collection)
	    rerenderCollection(collection, unavailableView, $('#js-unavailable-tbody'))

	  }
	})

	availableCollection.fetch({
	  success: function(collection) {
	  	console.log('successful fetch')
	    console.log(collection)
	    rerenderCollection(collection, availableView, $('#js-available-tbody'))
	  }
	})

	var rerenderCollection = function(collection, viewContructor, tbody){
		tbody.html('')
	    collection.each(function(result) {
		  	console.log('result',result)
	      	new viewContructor({model: result})
	    })
	}

	
