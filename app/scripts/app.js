// This is our main logic for the app.
// Written by Andy Flack (@flackap), and Mason Stewart (@masondesu)
// Enjoy!

// this sucks. Really, Parse?
Parse.$ = jQuery;

// the keys! the keys!
Parse.initialize("vntCtDn8oflM08j1SD0sRWMdh15gbdoVPJ6jvfc0", "qd0ZpKz5gunLVSz8UXmpcLM8jqWAZs2rSUA6b6MV");


// And the instances...
var availableCollection = new BookCollection({available: true}),
    unavailableCollection = new BookCollection({available: false}),
    current = 'available',
    callback = {
			success: function(collection) {
    		// clear the div we're about to fill
    		current == 'available' ? $("#js-available-tbody").html('')	: $("#js-unavailable-tbody").html('')
				
				// then fill it up!
				collection.each(function(result) {
			    	new BookView({model: result})
			  })
			}
		}

unavailableCollection.fetch(callback)
availableCollection.fetch(callback)



$(function() {

	var $el = $( '#baraja-el' ),
			baraja = $el.baraja();

	$( '.toggle' ).on( 'click', function( event ) {
		if (current == 'available') {
			unavailableCollection.fetch(callback);
			current = 'unavailable';
		} else {
			availableCollection.fetch(callback);
			current = 'available';
		}

		baraja.next();			
	});

});
