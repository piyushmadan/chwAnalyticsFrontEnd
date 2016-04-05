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
	},
	consolidateApiToArray : function(data , consolidateKey, keyName, valueName, arrayOfObjectName, arrayOfObjectLegendTitle){

		// DATE: "2016-03-02"
		// count:10
		// date_titleVar_Value:"2016-03-02_FDCENCONSENT_1"
		// titleVar_Value:"FDCENCONSENT_1"

		// DATE:"2016-03-02"
		// count:1
		// date_titleVar_Value:"2016-03-02_FDCENCONSENT_6"
		// titleVar_Value:"FDPSRCONSENT_1"

		// DATE:"2016-03-03"
		// count:11
		// date_titleVar_Value:"2016-03-03_FDCENCONSENT_1"
		// titleVar_Value:"FDCENCONSENT_1"

		  // Change above mentioned array in result to   JSON of following structure (name using arrayOfObjectLegendTitle)
          //   ['Date', 'Surveillance Consented', 'Enrollment Consented'],
          //   ['2016-03-02',  10,      1],
          //   ['2016-03-03',  11,      null],

          if(!arrayOfObjectLegendTitle){
          	arrayOfObjectLegendTitle= arrayOfObjectName;
          }

          var resultArray = new Array();
          	resultArray.push(arrayOfObjectLegendTitle);

          var consolidatedKeyList = new Array();	

		  for(var i=0; i< data.length; i++) {
				
		  		var consolidateKeyFound = consolidatedKeyList.indexOf(data[i][consolidateKey]);
		  		if(consolidateKeyFound==-1){
		  			consolidatedKeyList.push(data[i][consolidateKey]);
		  		}
 			}

		  for(var i=0; i< consolidatedKeyList.length; i++) {				
		  	var nestedArray = Array.apply(null, Array(arrayOfObjectName.length)).map(Number.prototype.valueOf,0);
		  	nestedArray[0] = consolidatedKeyList[i]
          	resultArray.push(nestedArray);
 			}


		  for(var i=0; i< data.length; i++) {
				
				// if keyName in arrayOfObjectName	(=A)
				//  then find index of consolidateKey in consolidatedKeyList (=B)
				//  put value of valueName in resultArray[B+1][A] //B+1 because first one is for arrayOfObjectLegendTitle

				var indexOfkeyName = arrayOfObjectName.indexOf(data[i][keyName]);


				if(indexOfkeyName){
					var indexOfconsolidateKey = consolidatedKeyList.indexOf(data[i][consolidateKey]);
					if(!indexOfconsolidateKey){
						console.log("something wrong here. Previous loop didn't work properly . "+ data[i][consolidateKey])
					} else {

						// console.log('indexOfconsolidateKey', indexOfconsolidateKey)
						// console.log('indexOfkeyName', indexOfkeyName)

						resultArray[indexOfconsolidateKey+1][indexOfkeyName] = data[i][valueName];
					}
				}

 			}




 			return resultArray;
	},
	logout: function(){
		console.log("logout");
		sessionStorage.removeItem('authorization');
		location.reload();
		}

}