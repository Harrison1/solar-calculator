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

	    	$( '#answerA' ).html(commaNumber(kilon));
	    	$( '#answerA-2' ).html(commaNumber(kilon));

	    	$( '#answerB' ).html(commaNumber(savings));
	    	$( '#answerB-2' ).html(commaNumber(savings));

	    	$( '#answerC' ).html(commaNumber(parseFloat(panels).toFixed(0)));
	    	$( '#answerC-2' ).html(commaNumber(parseFloat(panels).toFixed(0)));

	    	$( '#answerD' ).html(commaNumber(parseFloat(produce).toFixed(0)));

	    	if($( '#sun_img' ).is( ':visible' )) {
	    		$( '#sun_img' ).toggle('slow');
	    		$( '#answers' ).toggle('slow');
	    	}

	    } else {
	    	Materialize.toast('<i class="material-icons prefix error-icon">error</i><p><b>Oops, there was an error</b><br>Make sure to fill in all the fields<br>before pushing <b>calculate</b></p>', 5000, 'error-toast')
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
    	var b = a/sun;
    	var c = b/0.80;
    	var d = parseFloat(c).toFixed(2);
    	return d;
    }

    function savingsFormula(dc, sun, sk) {
    	var a = dc*sun;
    	var b = a/12;
    	var c = b*sk;
    	var d = parseFloat(c).toFixed(2);
    	return d;
    }

    function coverHome(sq) {
    	var a = sq/(1/144);
    	var b = a/17.60;
    	var c = parseFloat(b).toFixed(2);
    	return c;
    }

    function producekw(tot) {
    	var a = tot*270;
    	var b = a/1000;
    	var c =  parseFloat(b).toFixed(2);
    	return c;
    }

    function commaNumber(num) {
	    var n= num.toString().split(".");
	    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return n.join(".");
	}

});
