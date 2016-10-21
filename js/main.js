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


	$.getJSON( file_name, function( json ) {
	  	data = json;
	 });

	$( '#calculate' ).click(function() {

		state = $('#choose_state').val();
		bill = $('#monthly_bill').val();
		usage = $('#monthly_usage').val();
		footage = $('#square_footage').val();

		if( state != null && state != "" && bill != null && bill != "" && usage != null && usage != "" && footage != null && footage != "" ) {

			var jsonvalues = $.grep(data, function(n, i) {
	    		return (n['state'] == state);
	    	});

	    	var myvalues = jsonvalues;

	    	bill = parseFloat(bill).toFixed(2);
			usage = parseFloat(usage).toFixed(2);
			footage = parseFloat(footage).toFixed(2);

	    	mystate = myvalues[0].state;
	    	mysun = myvalues[0].sunlight;
	    	mykilo = myvalues[0].kilowatthour;

	    	var kilon = dcSystemFormula(usage, mysun);

	    	var savings = savingsFormula(kilon, mysun, mykilo);

	    	var panels = coverHome(footage);

	    	var produce = producekw(panels);

	    	$( '#answerA' ).html(kilon);
	    	$( '#answerB' ).html(savings);
	    	$( '#answerC' ).html(panels);
	    	$( '#answerD' ).html(produce);

	    	if($( '#sun_img' ).is( ':visible' )) {
	    		$( '#sun_img' ).toggle('slow');
	    		$( '#answers' ).toggle('slow');
	    	}

	    } else {
	    	Materialize.toast('<i class="material-icons prefix error-icon">error</i><p><b>Oops, a field is blank</b><br>Make Sure to fill in all the fields<br>before pushing <b>calculate</b></p>', 5000, 'error-toast')
	    }

    });

    $( '#reset' ).click(function() {

    	if($( '#answers' ).is( ':visible' )) {
    		$( '#sun_img' ).toggle('slow');
    		$( '#answers' ).toggle('slow');
    	}

		$('#monthly_bill').val('');
		$('#monthly_usage').val('');
		$('#square_footage').val('');

		bill = null;
		usage = null;
		footage = null;

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
