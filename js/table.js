demo_data = [{
    "name": "bootstrap-table",
        "stargazers_count": "10",
        "forks_count": "122",
        "description": "An extended Bootstrap table"
}, {
    "name": "multiple-select",
        "stargazers_count": "288",
        "forks_count": "20",
        "description": "A jQuery plugin to select multiple elements with checkboxes :)"
}, {
    "name": "bootstrap-table",
        "stargazers_count": "32",
        "forks_count": "11",
        "description": "Show/hide password plugin for twitter bootstrap."
}, {
    "name": "bootstrap-table",
        "stargazers_count": "1",
        "forks_count": "4",
        "description": "my blog"
}, {
    "name": "scutech-redmine 1",
        "stargazers_count": "50",
        "forks_count": "3",
        "description": "Redmine notification tools for chrome extension."
}];

$(function () {

    var url = "http://localhost:3000/"

   // $("#dashboard_graphs").hide();


    resultTable = {

        ajaxDataFromUrl:  function(){



        }, 

        responseHandler: function(res) {
            return res.result;
        },

        rowStyle: function(value, row, index) {

                    if(value.percentage>80){
                        return{
                            css: {"background-color": "green !important"}
                        };                        
                    }
                    if(value.percentage>60){
                        return{
                            css: {"background-color": "yellow !important"}
                        };                        
                    }

                        return{
                            css: {"background-color": "red !important"}
                        };                        

                },

        updateOptions: function(){


            var startDate = new Date($("#formStatusReportDateRange  [name='start']").val()).toISOString().slice(0,10);
            var endDate = new Date($("#formStatusReportDateRange  [name='end']").val()).toISOString().slice(0,10);

            var newUrl = url + "formStatusReport?aggregator="+$("#formStatusReportAggregator").val()+"&groupBy="+$("#formStatusReportGroupBy").val()+"&startDate="+startDate+"&endDate="+endDate

            console.log("update new report using from : " + newUrl)

            $('#tableFormStatusReport').bootstrapTable('refresh',
                    {url: newUrl});







            $('#tableFormStatusReport').on(
                "   load-success.bs.table",// refresh-options.bs.table", 
                    function() {
                        console.log("onRefreshOptions");


                //If a paticular column is empty, them hide that 
                var currentData = $('#tableFormStatusReport').bootstrapTable('getData');
                console.log(currentData);
                $('#tableFormStatusReport').bootstrapTable('hideColumn','tlPinId');
                $('#tableFormStatusReport').bootstrapTable('hideColumn','sectorId');
                var showFlag = {
                             tlPinId:0,
                             sectorId:0
                            };

                for (var i = currentData.length - 1; i >= 0 ; i--) {
                    if(showFlag.tlPinId && showFlag.sectorId){
                        console.log("tlPinId -- sectorId found ")
                        break;   
                    }

                    // checking only first 100 records, otherwise it takes very long and freezes frontend
                    if(i==currentData.length-100 ){
                        break;

                    }

                    if(currentData[i].tlPinId){
                        console.log("currentData[i].tlPinId");
                        console.log(currentData[i].tlPinId);
                        console.log(i);
                        $('#tableFormStatusReport').bootstrapTable('showColumn','tlPinId');
                        showFlag.tlPinId=1;
                    }
                    if(currentData[i].sectorId){
                        $('#tableFormStatusReport').bootstrapTable('showColumn','sectorId');
                        showFlag.sectorId=1;
                    }
                };
              }
            )








        }


    }







    $('#tableFormStatusReport').bootstrapTable({
       // data: demo_data
    });







    $(".mybtn-top").click(function () {
        $('#table').bootstrapTable('scrollTo', 0);
    });
    
    $(".mybtn-row").click(function () {
        var index = +$('.row-index').val(),
            top = 0;
        $('#table').find('tbody tr').each(function (i) {
        	if (i < index) {
            	top += $(this).height();
            }
        });
        $('#table').bootstrapTable('scrollTo', top);
    });
    
    $(".mybtn-btm").click(function () {
        $('#table').bootstrapTable('scrollTo', 'bottom');
    });

});