Util = {

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