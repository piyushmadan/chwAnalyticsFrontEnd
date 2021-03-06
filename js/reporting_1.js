// $(function () {

    var url = config.apiUrl ;

    resultTable = {
        ajaxDataFromUrl:  function(){
        }, 

        responseHandler: function(res) {
            return res.result;
        },

        rowStyle: function(value, row, index) {

                    if(value.percentage>80){
                        return{
                            css: {"background-color": "lightgreen !important"}
                        };                        
                    }
                    if(value.percentage>60){
                        return{
                            css: {"background-color": "yellow !important"}
                        };                        
                    }

                        return{
                            css: {"background-color": "tomato !important"}
                        };                        

                },

        updateOptions: function(){


            var startDate = new Date($("#formStatusReportDateRange  [name='start']").val()).toISOString().slice(0,10);
            var endDate = new Date($("#formStatusReportDateRange  [name='end']").val()).toISOString().slice(0,10);

            var newUrl = url + "formStatusReport?aggregator="+$("#formStatusReportAggregator").val()+"&groupBy="+$("#formStatusReportGroupBy").val()+"&startDate="+startDate+"&endDate="+endDate

                 newUrl+= "&indicator1="+    
            console.log("update new report using from : " + newUrl)


            $.ajax
              ({
                type: "GET",
                url: newUrl,
                dataType: 'json',
                async : false,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("authorization", sessionStorage.getItem("authorization"));
                    xhr.setRequestHeader("Content-Type","application/json")
                },
                success: function (response){
                    $("#formStatusReportDiv").show();
                    $('#tableFormStatusReport').bootstrapTable('load', response.result);

                }
            });



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

// });