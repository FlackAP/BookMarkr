// The atomic book model. simple defaults, nothing special
var Book = Parse.Object.extend("Books", {
  defaults: {
    "user": "n/a"
  },

  checkIn: function() {
    this.save({available: true})
    this.save({user: 'none'})
  },

  status: function() {
    return this.get('available') ? 'available' : 'unavailable'
  }
});

// Our trusty collection constructor
var BookCollection = Parse.Collection.extend({
  model: Book,

  initialize: function(options){
    this.query = (new Parse.Query(Book)).equalTo("available", options.available)
  }
});