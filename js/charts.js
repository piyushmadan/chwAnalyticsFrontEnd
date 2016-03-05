// https://docs.google.com/document/d/1vIIMDohNfs4Jf5o_r8svLCLTCziH8yWoDtjIYBb3s_A/edit
  
//    config

     // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart','bar','BarChart','geochart']});

      // Set a callback to run when the Google Visualization API is loaded.
      // google.setOnLoadCallback(drawChart);
      google.setOnLoadCallback(drawAreaChart);

      google.setOnLoadCallback(drawStacked);
      google.setOnLoadCallback(drawBarChart);
      google.setOnLoadCallback(drawBarChart2);
      google.setOnLoadCallback(drawRegionsMap);


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
        drawRegionsMap();

      },4000
        )

      setTimeout(function(){
        drawStacked();

      },3000
        )




      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }


      function drawAreaChart() {

          $.ajax({
            url: config.apiUrl+"/FormStatusCount",
            context: document.body
          }).done(function(result) {
            console.log(arguments);
            console.log(result.result);


          console.log(result.result);
          var arrayForDataTable = Util.apiToArray(result.result,['time', 'completed', 'scheduled'])
          console.log(arrayForDataTable);

          var data = google.visualization.arrayToDataTable(arrayForDataTable);
          // [
          //   ['Year', 'Scheduled', 'Actual'],
          //   ['Jan1',  1000,      400],
          //   ['Jan2',  1170,      460],
          //   ['Jan3',  660,       520],
          //   ['Jan4',  130,      110],
          //   ['Jan5',  100,      100],
          //   ['Jan6',  1170,      1160],
          //   ['Jan7',  660,       620],
          //   ['Jan8',  1030,      940],
          //   ['Jan9',  1000,      400],
          //   ['Jan10',  1170,      960],
          //   ['Jan11',  660,       620],
          //   ['Jan12',  1030,      940],
          //   ['Jan13',  1000,      900],
          //   ['Jan14',  1170,      960],
          //   ['Jan15',  660,       120],
          //   ['Jan16',  1030,      1140],
          // ]);

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

function drawStacked() {
        var data = google.visualization.arrayToDataTable([
          ['Type of Form', 'Completed', 'Not Completed', 'Person not found'],//, { role: 'annotation' }],
          ['ANC Visit', 1000, 240, 20  ],
          ['High risk women', 600, 190, 29],
          ['Registration', 160, 22, 23 ]
        ]);
      var options = {
        legend: {position: "top"},
   //     bar: { groupWidth: '75%' },
        isStacked: 'percent',
        bars: 'horizontal'
      };


      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div3'));
      chart.draw(data, options);
    }



      function drawBarChart() {

          $.ajax({
            url: config.apiUrl+"/FormUnitDataCount",
            context: document.body
          }).done(function(result) {
            console.log(arguments);
            console.log(result.result);


          console.log(result.result);
          var arrayForDataTable = Util.apiToArray(result.result,
          [ 'date',
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
          console.log(arrayForDataTable);

          var data = google.visualization.arrayToDataTable(arrayForDataTable);


        // Create the data table.
        // var data = google.visualization.arrayToDataTable([
        //   [ 'Time period',
        //   'Surveillance Consented',
        //   'Eligible MWRAs',
        //   'Pregnancies Identified',
        //   'Enrollment Consented',
        //   'Live births'],
        //   [ "Jan 2016", 1000, 240, 20, 10 ,3],
        //   [ "Feb 2016", 600,  190, 29, 190,5],
        //   ["Mar 2016", 160, 22,  23, 22 ,3]
        // ]);


      var options = {
        legend: { position: 'top'},
       };
          var chart =  new google.visualization.LineChart(document.getElementById('chart_div4'));
  
            chart.draw(data, options);
 
          });


      }


      function drawBarChart2() {

        // Create the data table.
        var data = google.visualization.arrayToDataTable([
          [ '',
            'Met (FDCENSTAT = 1)',
            'Not Met (FDCENSTAT=2)',
            'Refusal (Visit Status) (FDCENSTAT=6)',
            'Permanent Move (FDCENSTAT=7)',
            'Woman Died (FDCENSTAT=8)',
            'DMC (FDCENSTAT=999)',
            'Pending (Scheduled - COUNT(CENSUS Submissions))',
            'Consented (FDCENCONSENT = 1)',
            'Refused (FDCENCONSENT = 6)'
          ],
          [ "Census", 1000, 240, 20, 10 ,3,1000, 240, 20, 0 ],
          [ "PSRF", 600,  190, 29, 190,5,240, 20, 10 ,3],
          [ "SES", 160, 22,  23, 22 ,3, 600,  190, 29, 190],
          [ "PVF", 160, 22,  23, 22 ,3, 22,  23, 22 ,3],
          [ "ANC 1-4", 160, 22,  23, 22 ,3, 29, 190,5,240],
          [ "VS29", 160, 22,  23, 22 ,3, 190,5,240, 20],
          [ "VS43", 160, 22,  23, 22 ,3, 22 ,3, 22,  23],
        ]);


      var options = {
        legend: { position: 'top'},
       };
          var chart =  new google.charts.Bar(document.getElementById('chart_div5'));
  
            chart.draw(data, options);
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

        chart.draw(data, options);
      }









