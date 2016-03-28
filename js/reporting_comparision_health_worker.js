    var url = config.apiUrl ;

    resultTable = {
        ajaxDataFromUrl:  function(){
        }, 

        responseHandler: function(res) {
            return res.result;
        },

        // rowStyle: function(value, row, index) {

        //             if(value.percentage>80){
        //                 return{
        //                     css: {"background-color": "green !important"}
        //                 };                        
        //             }
        //             if(value.percentage>60){
        //                 return{
        //                     css: {"background-color": "yellow !important"}
        //                 };                        
        //             }

        //                 return{
        //                     css: {"background-color": "red !important"}
        //                 };                        

        //         },

        cellStyle: function(value, row, index) {

//            console.log(arguments);
            if(!value){
                        return{
                            css: {"background-color": "lightgrey !important"}
                        };  
                }

            var value_1 = value.toString().split(" (") || 0;
            if(value_1.length>1){
                var value_2 = value_1[1].split("%")[0];
                var value_percentage = parseInt(value_2);
            } else {
                var value_percentage = -1;
            }        


           // console.log(value);

                    if(value_percentage>80){
                        return{
                            css: {"background-color": "green !important"}
                        };                        
                    }
                    if(value_percentage>=60){
                        return{
                            css: {"background-color": "yellow !important"}
                        };                        
                    }
                    if(value_percentage>0){
                        return{
                            css: {"background-color": "red !important"}
                        };                        
                    }



                        return{
                            css: {"background-color": "lightgrey !important"}
                        };    

    // var classes = ['active', 'success', 'info', 'warning', 'danger'];

    //                     return {
    //                     css: {"color": "blue !important" , "font-size": "50px", "background-color": "red !important"},
    //                 //        css: {"background-color": "red !important"}
    //                     classes: classes[index / 2]

    //                     };                        

                },

        rankPercSorter : function(a,b) {

            if( !a ) {
                return 1;
            }

            if( !b) {
                return -1;
            }


            if(a.split(" (").length>1){
                a = parseInt(a.split(" (")[0]);
            }


            if(b.split(" (").length>1){
                b = parseInt(b.split(" (")[0]);
            }

            console.log("-");
            console.log(a)
            console.log(b)


            if (a < b) return -1;
            if (a > b) return 1;
            return 0;



        },        

        sortConsideringNull : function(a,b) {

            if( !a ) {
                return 1;
            }

            if( !b) {
                return -1;
            }

            if (a < b) return -1;
            if (a > b) return 1;
            return 0;



        },     




        updateOptions: function(){


            var startDate = new Date($("#formStatusReportDateRange  [name='start']").val()).toISOString().slice(0,10);
            var endDate = new Date($("#formStatusReportDateRange  [name='end']").val()).toISOString().slice(0,10);

            var newUrl = url + "CHWScoringIndicator1?aggregator="+$("#formStatusReportAggregator").val()+"&groupBy="+$("#formStatusReportGroupBy").val()+"&startDate="+startDate+"&endDate="+endDate

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
