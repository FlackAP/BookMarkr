// this is the main book view, and will appropriately place and render
// books, regardless of their status.
var BookView = Parse.View.extend({
  tagName: 'tr',

  events: {
    "click .check-in": "checkIn",
    "click .check-out" : "checkout",
  },

  unavailableTemplate: _.template($('#unavailable').text()),
  availableTemplate:   _.template($('#available').text()),
  checkoutTemplate:    _.template($('#checkout-modal').text()),

  initialize: function() {
    // just automagically figure out which div to append this.el into
    $("#" + this.model.status() + "-view").append(this.el)
    this.render()
  },
  
  render: function() {
    // will call unavailableTemplate or availableTemplate depending on status
    this.$el.append(this[this.model.status()+'Template']( {result: this.model} ))
  },

  checkIn: function() {
    this.model.checkIn();
    this.remove()
  },

  checkout: function() {
    $('.modal').html(this.checkoutTemplate({result: this.model}))
    $('.modal').addClass('active')
    that = this;
    $('.confirm').click(_.bind(that.saveNewUser,that))
  },

  saveNewUser: function(){
    this.model.save({
      user: $('.user-input').val(),
      available: false
    });

    $('.modal').removeClass('active')
    this.remove()
  }
})