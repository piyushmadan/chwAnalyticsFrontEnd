
// [[VERY IMPORTANT]] - To enable CORS if running Couchdb on same server as webserver requesting resource
// nano /usr/local/etc/couchdb/local.ini  
// Follow instructions: http://docs.couchdb.org/en/1.3.0/cors.html
// couchdb restart

// jquery.couchdb.js documentation:
// http://daleharvey.github.io/jquery.couch.js-docs/symbols/%24.couch.db.html#.view
// http://bradley-holt.com/2011/07/couchdb-jquery-plugin-reference/

// View names mentioned in viewsForCouchDB.js


// // Example 1: 
// $.ajax({
//     type: "GET",
//     url: $.couch.urlPrefix + "/opensrp/_design/test/_view/count_by_type_and_form_name?group_level=2",
//     // data: {
//     //     map: mapFun,
//     //     reduce: reduceFun
//     //},
//     contentType: "application/json",
//     success: function (data) {
//         console.log(data);
//      },
// })
// .done(function(result) {
//     console.log(result.length);
// });



// // Example 2:
// var mapFunction = "function(doc) { emit(); }"

// $.couch.db("opensrp").query(mapFunction, "_count", "javascript", {
//     dataType : "jsonp",
//     success: function(data) {
//         console.log(data);
//     },
//     error: function(status) {
//         console.log(status);
//     },
//     reduce: false
// });

// // Example 3:
// $.couch.info({
//     success: function(data) {
//         console.log(data);
//         alert("hi");
//     }
// });

$.ajax({
  url: config.couchDBUrl + "/_utils/script/jquery.couch.js",
  dataType: "script",
//  success: success
});


alertTable = {
        ajaxDataFromUrl:  function(){
        }, 

        cellStyle: function(value, row, index) {

            // console.log("value");
            // console.log(value);

            // console.log("row");
            // console.log(row);

            // console.log("index");
            // console.log(index);

             // $("#tableformAlert").bootstrapTable('updateCell',{
             //        index: index ,
             //        field:'geoLocation',
             //        value: value.FWWOMSUBUNIT + value.FWWOMUNION + value.FWWOMUPAZILLA + value.FWWOMWARD + value.FWWOMMAUZA_PARA
             //        });


            // doc.doc.FWWOMUPAZILLA + "-" +
            // doc.doc.FWWOMMAUZA_PARA + "-" +
            // doc.doc.FWWOMWARD + "-" +
            // doc.doc.FWWOMUNION + "-" +
            // doc.doc.FWWOMSUBUNIT + "-"             



                    return{
                        classes: 'tree_'+index,
                        css: {"background-color": "lightgrey !important"}
                    };    

                },



    }


var activateEventsFromAlertsPage = function() {

// // Example 3:
$.couch.info({
    success: function(data) {
        console.log(data);
    }
});

    //http://127.0.0.1:5984/_utils/database.html?opensrp/_design/test/_view/count_by_type_and_form_name
   
     $("#showAlertListButton").on("click",function(){

//        alert("showAlertListButton pressed")
        console.log($("#formAlertType").val());

        $.couch.urlPrefix = config.couchDBUrl //"http://localhost:5984";

    //    $('#tableformAlert').bootstrapTable('showLoading');       
        
        $.couch.db("opensrp").view("alert"+ "/"+ $("#formAlertType").val().split("_")[0], {
            dataType : "jsonp",
            success: function(data) {
                console.log(data);

                g_data = data;

             //   $('#tableformAlert').bootstrapTable('hideLoading');       

                 $('#formAlertDiv').show();

                 //Due to bug in bootstrap library, following is used for the first time
                $('#tableformAlert').bootstrapTable({
                    data: data.rows
                });

                 //Due to bug in bootstrap library, following is used after first time
                $('#tableformAlert').bootstrapTable('load', data.rows)



                // underscore ("_") is used to mention filter on value in the table
                if($("#formAlertType").val().split("_").length>=2){
                    var filterValue = $("#formAlertType").val().split("_")[1];
                    filterValue = isNaN(filterValue) ? filterValue : parseInt(filterValue);
                    $('#tableformAlert').bootstrapTable('filterBy', {value: filterValue});

                }



            },
            error: function(status) {
                console.log(status);
            },
            reduce: true,
            group_level:2
        });

    });
}


// Actions on the data 

$('#tableformAlert').on(" load-success.bs.table all.bs.table pre-body.bs.table  ",// all.bs.table load-success.bs.table load-error.bs.table refresh.bs.table reset-view.bs.table refresh.bs.table load-success.bs.table load-error.bs.table all.bs.table refresh-options.bs.table ", 
        function(name, args) {
      //      console.log("onRefreshOptions name: "+name);
            console.log(name);

//            alert("onRefreshOptions:"+name);


    //If a paticular column is empty, them hide that 
    var currentData = $('#tableformAlert').bootstrapTable('getData');

    g_currentData = currentData;
    console.log(currentData);

    // console.log("*******loaded some data*********")

    for(var i=0; i < currentData.length; i++){

             // $("#tableformAlert").bootstrapTable('updateCell',{
             //        index: i ,
             //        field:'geoLocation',
             //        value: currentData[i].value

             //       // value.FWWOMSUBUNIT + value.FWWOMUNION + value.FWWOMUPAZILLA + value.FWWOMWARD + value.FWWOMMAUZA_PARA
             //        });

        
      //          $(function() {
            // $('.tree_'+i).tree({
            //     data: currentData[i]
            // });
    //        });

    }

     var currentData = $('#tableformAlert').bootstrapTable('getData');



    for(var i=0; i< currentData.length; i++){
         $('.tree_'+i).html('<div id="tree_'+i+'"></div>');        
    //$('#jstree_demo_div')
        var doc = currentData[i];
      //  console.log(doc);

        if(doc){
           // $('#tree_'+i).tree({
           //              data: doc
           //      });

            $('#tree_'+i).html(JSON.stringify(doc));
                
        }

    }

  }
);

// Example to make tree node of JSON
// var data = [
//     {
//         label: 'node1', id: 1,
//         children: [
//             { label: 'child1', id: 2 },
//             { label: 'child2', id: 3 }
//         ]
//     },
//     {
//         label: 'node2', id: 4,
//         children: [
//             { label: 'child3', id: 5 }
//         ]
//     }
// ];

// $('#tree1').tree({
//     data: data
// });


var setupCouchDBJS = function(){
    console.log("trying to load couchdb");
    if($.couch){
            $.couch.urlPrefix = config.couchDBUrl;
            clearInterval(refreshIntervalId);
            activateEventsFromAlertsPage();
    }

}
// Try every 1 sec
var refreshIntervalId = setInterval(setupCouchDBJS, 1000);
