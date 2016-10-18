$( document ).ready(function() {

	$( '#answers' ).hide();

	$( '#calculate' ).click(function() {
    	console.log( $("#choose_state").val());
    	console.log( $("#monthly_bill").val());
    	console.log( $("#monthly_usage").val());
    	console.log( $("#square_footage").val());
    	// $('#modal1').openModal();

    	$( '#sun_icon' ).addClass('fadeOutUp');

    	$( '#answers' ).removeClass('fadeOutDown');

    	$( '#answers' ).addClass('fadeInUp');
    	$( '#answers' ).show();

    });

    $( '#reset' ).click(function() {
    	$( '#sun_icon' ).removeClass('fadeOutUp');
    	$( '#sun_icon' ).addClass('fadeInDown');

    	$( '#answers' ).removeClass('fadeInUp');
    	$( '#answers' ).addClass('fadeOutDown');

    });

});
