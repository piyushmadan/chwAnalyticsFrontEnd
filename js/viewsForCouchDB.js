//Map Reduce functions for couchdb

///////////////////////////////////////////////////////////
//// view Name: alert/findMissingWorkerVisit
// 0 -- no FD , FWA
// 1 -- FD, not FWA
// 2 -- not FD , FWA
// 3 -- both FD, FWA
// Map Function
////
function(doc) {
    if((doc.doc.caseID || doc.doc.caseId) && doc.doc.details.user_type ){
        emit([doc.doc.caseID || doc.doc.caseId,doc],doc.doc.details.user_type);
    }
}

////
// Reduce function
////

function(keys, values, rereduce) {
    
    var FD_FWA_visited =0;
    // 0 -- no FD , FWA
    // 1 -- FD, not FWA
    // 2 -- not FD , FWA
    // 3 -- both FD, FWA
    
    var FD_visited = 0 ;
    var FWA_visited = 0;
    
    for(var i=0; i<values.length; i++){
        if(values[i]=="FD") { FD_visited=1} 
        if(values[i]=="FWA") { FWA_visited=1}   
    }

    if(FD_visited==1){
        FD_FWA_visited = 1;
        if(FWA_visited==1){
            FD_FWA_visited = 3
        } 
    } else if(FWA_visited==1){
        FD_FWA_visited = 2
    }
    
    return FD_FWA_visited ; 
}

///////////////////////////////////////////////////////////
// NO NID AND NO BID
// view: alert/NidBidEmpty
////////////
// Map
function(doc) {
    if((doc.doc.caseID || doc.doc.caseId) && doc.doc.details.user_type ){
        emit([doc.doc.caseID || doc.doc.caseId,doc],    {
                                    nid:doc.doc.FWWOMNID, 
                                    bid: doc.doc.FWWOMBID
                                });
    }
}

// Reduce
function(keys, values, rereduce) {
    
    if(values[0].nid=="" && values[0].bid==""){
        return 1;
    } else{
        return 0;
    }
}

///////////////////////////////////////////////////////////
// Duplicate NID or BID in other cases
// view: alert/NidBidDuplicate
////////////
// Map
function(doc) {
    if( doc.doc.type=="Mother") {
        if(doc.doc.FWWOMNID && doc.doc.FWWOMNID!=""){
            emit([doc.doc.FWWOMNID,doc,"NID"], 1);
        }
        if(doc.doc.FWWOMNID && doc.doc.FWWOMBID!=""){
            emit([doc.doc.FWWOMBID,doc,"BID"], 1);
        }
    }
}

// Reduce
function(keys, values, rereduce) {

    if(values.length>1) {
        return values.length;
    } else {
        return 0;
    }

}