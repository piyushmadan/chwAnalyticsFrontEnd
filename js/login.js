var login = function(evt,values){
		console.log(arguments);
		var username = $("#mainUsername").val();
		var password = $("#mainPassword").val();  

		function make_base_auth(username, password) {
		  var tok = username + ':' + password;
		  var hash = btoa(tok);
		  return "Basic " + hash;
		}

		$.ajax
		  ({
		    type: "GET",
		    url: config.apiUrl + "login",
		    dataType: 'json',
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("authorization", make_base_auth(username, password));
		        xhr.setRequestHeader("Content-Type","application/json")
		    },
		    success: function (){
		    	sessionStorage.setItem("authorization", make_base_auth(username, password));
		    	location.reload();
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		    	console.log("can't login");
		    	console.log(arguments);
    			alert("Unable to verify your login credentials. Status: " + textStatus);
		    }
		});
}


$('#mainUsername , #mainPassword').on('keypress',function(e){
    if (e.keyCode == 13) {
		login();
    }
});

$('#mainLoginSubmit').on('click',login);
