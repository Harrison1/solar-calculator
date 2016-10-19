$( document ).ready(function() {

	$( '#answers' ).hide();

	var data,
		state,
		bill,
		usage,
		mystate,
		mysun,
		mykilo,
		footage;

	var file_name = './data/data.json';


	// var data = function() {
	//     var t = null;
	//     return $.ajax({
	//         async: !1,
	//         global: !1,
	//         url: file_name,
	//         dataType: "json",
	//         success: function(e) {
	//             t = e
	//         }
	//     }), t
	// }();

	// var data = $.getJSON( file_name, function() {
	//   	console.log( "success" );
	//   })
	//   .done(function() {
	//     console.log( "second success" );
	//   })
	//   .fail(function() {
	//     console.log( "error" );
	//   })
	//   .always(function() {
	//     console.log( "complete" );
	//   });


	$.getJSON( file_name, function( json ) {
	  	data = json;
	 });

	$( '#calculate' ).click(function() {

			state = $('#choose_state').val();
			bill = parseFloat($('#monthly_bill').val()).toFixed(2);
			usage = parseFloat($('#monthly_usage').val()).toFixed(2);
			footage = parseFloat($('#square_footage').val()).toFixed(2);

		if(state != null && bill != null && usage != null && footage != null) {
			var jsonvalues = $.grep(data, function(n, i) {
	    		return (n['state'] == state);
	    	});

	    	var myvalues = jsonvalues;

	    	mystate = myvalues[0].state;
	    	mysun = myvalues[0].sunlight;
	    	mykilo = myvalues[0].kilowatthour;

	    	console.log(state);
	    	console.log(bill);
	    	console.log(usage);
	    	console.log(footage);

	    	console.log(mystate);
	    	console.log(mysun);
	    	console.log(mykilo);

	    	// console.log(dcSystemFormula(usage, mysun));

	    	var kilon = dcSystemFormula(usage, mysun);

	    	var savings = savingsFormula(kilon, mysun, mykilo);

	    	var panels = coverHome(footage);

	    	var produce = producekw(panels);

	    	$( '#answerA' ).html(kilon);
	    	$( '#answerB' ).html(savings);
	    	$( '#answerC' ).html(panels);
	    	$( '#answerD' ).html(produce);

	    	$( '#sun_img' ).addClass('fadeOutUp');

	    	$( '#answers' ).removeClass('fadeOutDown');

	    	$( '#answers' ).addClass('fadeInUp');
	    	$( '#answers' ).show();
	    } else {
	    	Materialize.toast('Oops, it looks like you left a field blank.<br>Make Sure to fill in all the fields before pushing submit', 5000, 'error-toast')
	    }

    });

    $( '#reset' ).click(function() {

    	$( '#sun_img' ).removeClass('fadeOutUp');
    	$( '#sun_img' ).addClass('fadeInDown');

    	$( '#answers' ).removeClass('fadeInUp');
    	$( '#answers' ).addClass('fadeOutDown');

    	state = $('#choose_state').val('');
		bill = $('#monthly_bill').val('');
		usage = $('#monthly_usage').val('');
		footage = $('#square_footage').val('');

    });

    function dcSystemFormula(kwh, sun) {	
    	var a = kwh/30;
    	console.log("a= " + a);
    	var b = a/sun;
    	console.log("b= " + b);
    	var c = b/0.80;
    	console.log("c= " + c);

    	var d = parseFloat(c).toFixed(2);
    	console.log("d= " + d);

    	return d;

    }

    function savingsFormula(dc, sun, sk) {
    	var a = dc*sun;
    	console.log("a = " + a);

    	var b = a/12;
    	console.log("b = " + b);

    	var c = b*sk;
    	console.log("c = " + c);

    	var d = parseFloat(c).toFixed(2);
    	console.log("d= " + d);

    	return d;

    }

    function coverHome(sq) {
    	var a = sq/(1/144);
    	console.log("sq = " + sq);

    	var b = a/17.60;
    	console.log("b = " + b);

    	var c = parseFloat(b).toFixed(2);
    	console.log("c = " + c);

    	return c;
    }

    function producekw(tot) {
    	var a = tot*270;
    	console.log("a = " + a);

    	var b = a/1000;
    	console.log("b = " + b);

    	var c =  parseFloat(b).toFixed(2);
    	console.log("c = " + c);

    	return c;
    }

});
