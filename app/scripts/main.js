$(function() {

	var $el = $( '#baraja-el' ),
		baraja = $el.baraja();

	$( '.toggle' ).on( 'click', function( event ) {

					baraja.next();
				
	} );


});
		