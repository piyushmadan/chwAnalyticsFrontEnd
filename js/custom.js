// $(function () {
//   $('[data-toggle="popover"]').popover()
// })


$(document).ready(function () {


	$("#navbar ul").hide();

	if(sessionStorage.getItem("authorization")){
		$.ajax({
			    type: "GET",
			    url: config.apiUrl + "login",
			    dataType: 'json',
			    beforeSend: function(xhr) {
			        xhr.setRequestHeader("authorization", sessionStorage.getItem("authorization"));
			        xhr.setRequestHeader("Content-Type","application/json")
			    },
			    success: function (){
			    	$("#navbar ul").show();
			    //	sessionStorage.setItem("authorization", make_base_auth(username, password));
			    //	location.reload();
				//	Util.showHtmlElement([{id:"dashboard_graphs",html:"html/dashboard.html"}]);		
				
			    }
			});
//		$('#login').load('html/login.html'); 
	} else {
		// console.log("login");
		Util.showHtmlElement([{id:"login",html:"html/login.html"}]);		
	}

    
    $('.input-daterange').datepicker({
        todayBtn: "linked"
    });

	$("#dashboard_graphs").load("html/dashboard.html");

//	$('.dropdown-toggle').dropdown();

		$("#FDnav").on("click", function(e) {

			console.log("FD navigation clicked");
//             e.preventDefault();

              $('#dashboard_graphs').load('html/dashboard.html');

              // the rest of your code ...
          });
           


});
