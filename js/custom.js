// $(function () {
//   $('[data-toggle="popover"]').popover()
// })


$(document).ready(function () {




	if(!localStorage.getItem('auth')){
		console.log("login");
		Util.showHtmlElement([{id:"login",html:"html/login.html"}]);

//		$('#login').load('html/login.html'); 
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
