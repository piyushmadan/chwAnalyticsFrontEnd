// https://docs.google.com/document/d/1vIIMDohNfs4Jf5o_r8svLCLTCziH8yWoDtjIYBb3s_A/edit
  
//    config
      console.log("in charts.js");
     // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart','bar','BarChart','geochart']});

      // Set a callback to run when the Google Visualization API is loaded.
      // google.setOnLoadCallback(drawChart);
      google.setOnLoadCallback(drawAreaChart);

  //    google.setOnLoadCallback(drawStacked);
      google.setOnLoadCallback(drawBarChart);
      google.setOnLoadCallback(drawBarChart2);
   //   google.setOnLoadCallback(drawRegionsMap);


      setTimeout(function(){
        drawAreaChart();

      },3000
        )


      setTimeout(function(){
        drawBarChart();

      },3000
        )

     setTimeout(function(){
        drawBarChart2();
   //     drawRegionsMap();

      },4000
        )

      // setTimeout(function(){
      //   drawStacked();

      // },3000
      //   )


      function drawAreaChart() {

        if( $("#KeyIndicatorstart").val() && $("#KeyIndicatorend").val()){
          var dateString = "?startDate=" + (new Date($("#KeyIndicatorstart").val()).toISOString().substring(0, 10));
          dateString += "&endDate="+ (new Date($("#KeyIndicatorend").val()).toISOString().substring(0, 10));
        } else {
          var dateString = "";
        }
        
          $.ajax({
            url: config.apiUrl+"FormStatusCount"+dateString,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("authorization", sessionStorage.getItem("authorization"));
                xhr.setRequestHeader("Content-Type","application/json")
            },
            context: document.body
          }).done(function(result) {
            console.log(arguments);
            console.log(result.result);


          console.log(result.result);
          var arrayForDataTable = Util.apiToArray(result.result,['time', 'completed', 'scheduled'])
          console.log(arrayForDataTable);

          var data = google.visualization.arrayToDataTable(arrayForDataTable);

        var options = {
          title: 'FD\'s Performance',
          hAxis: {title: 'JWeek',  titleTextStyle: {color: '#333'}},
          explorer: { actions: ['dragToZoom', 'rightClickToReset'],  axis: ['horizontal','vertical' ]},
          legend: {position:'top'}
        //  vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
        chart.draw(data, options);




          });




      }

// Example to draw Stacked -- changed in iteration 1
// function drawStacked() {
//         var data = google.visualization.arrayToDataTable([
//           ['Type of Form', 'Completed', 'Not Completed', 'Person not found'],//, { role: 'annotation' }],
//           ['ANC Visit', 1000, 240, 20  ],
//           ['High risk women', 600, 190, 29],
//           ['Registration', 160, 22, 23 ]
//         ]);
//       var options = {
//         legend: {position: "top"},
//    //     bar: { groupWidth: '75%' },
//         isStacked: 'percent',
//         bars: 'horizontal'
//       };


//       var chart = new google.visualization.ColumnChart(document.getElementById('chart_div3'));
//       chart.draw(data, options);
//     }



      function drawBarChart() {


        if( $("#MoreIndicatorstart").val() && $("#MoreIndicatorEnd").val()){
          var dateString = "?startDate=" + (new Date($("#MoreIndicatorstart").val()).toISOString().substring(0, 10));
          dateString += "&endDate="+ (new Date($("#MoreIndicatorEnd").val()).toISOString().substring(0, 10));
        } else {
          var dateString = "";
        }

          $.ajax({
            url: config.apiUrl+"FormUnitDataCount"+dateString,
            context: document.body,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("authorization", sessionStorage.getItem("authorization"));
                xhr.setRequestHeader("Content-Type","application/json")
            }
          }).done(function(result) {            
            console.log(config.apiUrl+"FormUnitDataCount -- before arrayForDataTable");
            console.log(result.result);

          var arrayForDataTable = Util.consolidateApiToArray(result.result,
            'DATE',
            'titleVar_Value',
            'count',
          [ 'DATE',
            'FDCENCONSENT_1',
            'FDELIGIBLE_1',
            'FDBNFSTS_0',
            'FDPREGSTS_1',
            'FDPSRCONSENT_1'],
          [ 'Time period',
            'Surveillance Consented',
            'Eligible MWRAs',
            'Pregnancies Identified',
            'Enrollment Consented',
            'Live births']
            );
          console.log(config.apiUrl+"FormUnitDataCount -- after arrayForDataTable");
          console.log(arrayForDataTable);

          var data = google.visualization.arrayToDataTable(arrayForDataTable);


       // // Create the data table.
       //  var data = google.visualization.arrayToDataTable([
       //    [ 'Time period',
       //    'Surveillance Consented',
       //    'Eligible MWRAs',
       //    'Pregnancies Identified',
       //    'Enrollment Consented',
       //    'Live births'],
       //    [ "Jan 2016", 1000, 240, 20, 10 ,3],
       //    [ "Feb 2016", 600,  190, 29, 190,5],
       //    ["Mar 2016", 160, 22,  23, 22 ,3]
       //  ]);


      var options = {
        legend: { position: 'top'},
       };
          var chart =  new google.visualization.LineChart(document.getElementById('chart_div4'));
  
            chart.draw(data, options);
 
          });


      }


      function drawBarChart2() {

        if( $("#DashboardWeeklystart").val() && $("#DashboardWeeklyend").val()){
          var dateString = "?startDate=" + (new Date($("#DashboardWeeklystart").val()).toISOString().substring(0, 10));
          dateString += "&endDate="+ (new Date($("#DashboardWeeklyend").val()).toISOString().substring(0, 10));
        } else {
          var dateString = "";
        }


          $.ajax({
            url: config.apiUrl+"WeeklyReportData"+dateString,
            context: document.body,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("authorization", sessionStorage.getItem("authorization"));
                xhr.setRequestHeader("Content-Type","application/json")
            }
          }).done(function(result) {            

          var weeklyData = new Object();
          for(var i=0; i <= result.result.length; i++){
            if(result.result[i]){
              if((result.result[i]["titleVar"] in weeklyData) && result.result[i]["count"]){
                  weeklyData[result.result[i]["titleVar"]]+=result.result[i]["count"];
              } else if(result.result[i]["titleVar"] && result.result[i]["count"]){
                   weeklyData[result.result[i]["titleVar"]]=result.result[i]["count"];          
                }
            }
          }
        //Definition here: 
        // https://docs.google.com/document/d/1vIIMDohNfs4Jf5o_r8svLCLTCziH8yWoDtjIYBb3s_A/edit

        //TODO: update api to be get Pending # for following weekly stat chart
        
        // Create the data table.
        var data = google.visualization.arrayToDataTable([
          [ '',
            'Met', 'Not Met', 'Refusal (Visit Status) ',
            'Permanent Move', 'Woman Died', 'Husband Died' , 
            'DMC', 'Pending', 'Consented ', 
            'Refused ' , 'Divorced / Separated', 'Pregnancies Identified',
            'Live births', 'Miscarriage / Stillbirth',  'Woman Died before Birth',
            'Child Deaths',  'Menopausal or Wom / Hus Sterilized' , 'False Pregnancy Report' , 
            'Met & Pregnant', 'Completed'
 
          ],
          [ "Census", weeklyData["FDCENSTAT_1"] || 0 ,  weeklyData["FDCENSTAT_2"] || 0,  weeklyData["FDCENSTAT_6"] || 0, 
                      weeklyData["FDCENSTAT_7"] || 0 , weeklyData["FDCENSTAT_8"] || 0, 0, 
                      weeklyData["FDCENSTAT_999"] || 0,  0 , weeklyData["FDCENCONSENT_1"] || 0,  //TODO: Add Pending (Scheduled - COUNT(CENSUS Submissions))
                      weeklyData["FDCENCONSENT_6"] || 0 , 0 , 0,
                      0,0,0,
                      0,0,0,
                      0,0
                      ],
          [ "PSRF", weeklyData["FDPSRSTS_1"] || 0 ,  weeklyData["FDPSRSTS_2"] || 0,  weeklyData["FDPSRSTS_6"] || 0, 
                      weeklyData["FDPSRSTS_7"] || 0 , weeklyData["FDPSRSTS_8"] || 0, weeklyData["FDPSRSTS_88"] || 0, 
                      weeklyData["FDPSRSTS_999"] || 0 , 0, weeklyData["FDPSRCONSENT_1"] || 0,    //TODO: Pending (Scheduled - COUNT(PSRF Submissions))
                      weeklyData["FDPSRSTS_6"] || 0 ,  weeklyData["FDPSRSTS_5"] || 0 , weeklyData["FDPSRPREGSTS_1"] || 0,
                      0,0,0,
                      0,( weeklyData["FDPSRSTS_3"] || 0)+(weeklyData["FDPSRSTS_4"] || 0)+(weeklyData["FDPSRSTS_5"] || 0),0,
                      0,0
                      ],
          [ "SES",  0, 0,  0,  // This is Demo data
                    0 , 0, 0,  
                    0, 0,  0,
                    0,0,0,
                    0,0,0,
                    0,0,0,
                    0,0
                    ],
          [ "PVF", 0, weeklyData["FDBNFSTS_1"] || 0,  weeklyData["FDBNFSTS_6"] || 0, 
                    weeklyData["FDBNFSTS_7"] || 0 , weeklyData["FDBNFWOMVITSTS_0"] || 0, 0,   
                    0, 0,0, //TODO: Add Pending (Scheduled - COUNT (PVF Submissions))
                    0, 0,0, 
                    0, weeklyData["FDBNFSTS_4"] || 0 ,0,   //TODO: Add Live Births (Sum of FDBNFLB)
                    weeklyData["FDBNFCHLDVITSTS_0"] || 0,0,weeklyData["FDBNFSTS_0"] || 0,     
                    weeklyData["FDBNFSTS_1"] || 0,0
                    ],
          [ "ANC 1-4", 0, weeklyData["TLANCxREMSTS_2"] || 0,  23, 
                      0 , weeklyData["TLANCxREMSTS_8"] || 0, 0, 
                      weeklyData["TLANCxREMSTS_999"] || 0,0,0, //TODO: Add Pending (Scheduled - COUNT (PVF Submissions))
                      weeklyData["TLANCxREMSTS_6"] || 0,0,0,         
                      weeklyData["TLANCxREMSTS_3"] || 0,weeklyData["TLANCxREMSTS_4"] || 0,0,
                      0,0,0,
                      weeklyData["TLANCxREMSTS_1"] || 0,0
                      ],
          [ "VS29", 0, 0 ,  0 ,  //This is demo data
                    0 , 0, 0, 
                    0,0,0,
                    0,0,0,
                    0,0,0,
                    0,0,0,
                    0,0
                    ],
          [ "VS43", 0, 0, 0, //This is demo data
                    0 ,0, 0 ,
                    0, 0,0,
                    0,0,0,
                    0,0,0,
                    0,0,0,
                    0,0
                    ]

        ]);


        //For demo
        // var data = google.visualization.arrayToDataTable([
        //   [ '',
        //     'Met (FDCENSTAT = 1)',
        //     'Not Met (FDCENSTAT=2)',
        //     'Refusal (Visit Status) (FDCENSTAT=6)',
        //     'Permanent Move (FDCENSTAT=7)',
        //     'Woman Died (FDCENSTAT=8)',
        //     'DMC (FDCENSTAT=999)',
        //     'Pending (Scheduled - COUNT(CENSUS Submissions))',
        //     'Consented (FDCENCONSENT = 1)',
        //     'Refused (FDCENCONSENT = 6)'
        //   ],
        //   [ "Census", 1000, 240, 20, 10 ,3,1000, 240, 20, 0 ],
        //   [ "PSRF", 600,  190, 29, 190,5,240, 20, 10 ,3],
        //   [ "SES", 160, 22,  23, 22 ,3, 600,  190, 29, 190],
        //   [ "PVF", 160, 22,  23, 22 ,3, 22,  23, 22 ,3],
        //   [ "ANC 1-4", 160, 22,  23, 22 ,3, 29, 190,5,240],
        //   [ "VS29", 160, 22,  23, 22 ,3, 190,5,240, 20],
        //   [ "VS43", 160, 22,  23, 22 ,3, 22 ,3, 22,  23],
        // ]);


      var options = {
        legend: { position: 'top'},
       };
          var chart =  new google.charts.Bar(document.getElementById('chart_div5'));
  
            chart.draw(data, options);
          });
      }



      function drawRegionsMap() {

        var data = google.visualization.arrayToDataTable([
          ['Area', 'Visits completed (%)', 'Total Visits'],
          ['BD-A',  90, 185],
          ['BD-B',  95, 445],
          ['BD-C',  30, 145],
          ['BD-D',  60, 34],
          ['BD-E',  40, 34],
          ['BD-F',  50, 34],
          ['BD-G',  80, 34],


        ]);

        var options = {
          region: 'BD',
          resolution: 'provinces',
//          displayMode: 'text'
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
     //   Hidden till I figure out provided mappings
     //   chart.draw(data, options);
      }




  $('.input-small').datepicker({
              format: 'mm/dd/yyyy'
  });




