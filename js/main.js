$( document ).ready(function() {

	$( '#answers' ).hide();

	$.getJSON( "../data/data.json", function( json ) {
  		console.log( "JSON Data: " + json.state );
 	});

	$( '#calculate' ).click(function() {
    	console.log( $("#choose_state").val());
    	console.log( $("#monthly_bill").val());
    	console.log( $("#monthly_usage").val());
    	console.log( $("#square_footage").val());
    	// $('#modal1').openModal();

    	$( '#sun_img' ).addClass('fadeOutUp');

    	$( '#answers' ).removeClass('fadeOutDown');

    	$( '#answers' ).addClass('fadeInUp');
    	$( '#answers' ).show();

    });

    $( '#reset' ).click(function() {
    	$( '#sun_img' ).removeClass('fadeOutUp');
    	$( '#sun_img' ).addClass('fadeInDown');

    	$( '#answers' ).removeClass('fadeInUp');
    	$( '#answers' ).addClass('fadeOutDown');

    });

});
