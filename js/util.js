Util = {

	showHtmlElement: function(ArrayOfIdToShow){

		var listOfIdsToHideOnIndex =  ["login","dashboard_graphs","reporting_1","reporting_comparision_health_worker"];

		for(var i=0; i<listOfIdsToHideOnIndex.length; i++){
				$("#"+listOfIdsToHideOnIndex[i]).hide();
		}

		for(var i=0; i<ArrayOfIdToShow.length; i++){

			$("#"+ArrayOfIdToShow[i].id).show().load(ArrayOfIdToShow[i].html);
			console.log(ArrayOfIdToShow[i]);
		}

	},
	apiToArray : function(data , ArrayOfObjectName, ArrayOfObjectLegendTitle){

		  //JSON to following structure 
          //   ['Year', 'Scheduled', 'Actual'],
          //   ['Jan1',  1000,      400],
          //   ['Jan2',  1170,      460],
          //   ['Jan3',  660,       520],
          //   ['Jan4',  130,      110],

          if(!ArrayOfObjectLegendTitle){
          	ArrayOfObjectLegendTitle= ArrayOfObjectName;
          }

          var resultArray = new Array();
          	resultArray.push(ArrayOfObjectLegendTitle);


		  for(var i=0; i< data.length; i++) {
				
			var nestedArray = new Array();
			for(var j=0; j< ArrayOfObjectName.length; j++) {
	  			nestedArray.push(data[i][ArrayOfObjectName[j]]);
			}

	 			resultArray.push(nestedArray);
 			}


 			return resultArray;
	}


}