
function directLeave() {
    //alert($(".circleNotice").text());
	if($(".circleNotice").text()==0){
		navigator.notification.alert("There are no pending leave approval records.", function(){}, "Mewah Group", "Ok");
	} else{
		window.location="leave.html";
	}
    //window.location="leave.html";
}

function directHelpDeskMenu(counthodrecomment,counthodapproval, countithodapproval) {
    //alert($(".circleNotice2").text());
	if($(".circleNotice2").text()==0){
		navigator.notification.alert("There are no pending helpdesk approval records.", function(){}, "Mewah Group", "Ok");
	} else{
	    //alert(counthodrecomment);
		//alert(counthodapproval);
		//alert(countithodapproval);
	
		window.location="menu_helpdesk.html?counthodrecommend="+ counthodrecomment +"&counthodapproval="+counthodapproval+"&countithodapproval="+countithodapproval;
	}
}




function ValidateProfile(){
	loading.startLoading();
	dbmanager.getProfile(function(returnData){
	   if(returnData.rows.length==0){
			loading.endLoading();
			alert('No Profile, please relogin again');
	   }
	   else{
		  //alert('Gt PROFILE');
		  //alert(returnData.rows.item(0).userid);
		  // alert(returnData.rows.item(0).username);
		  postMenu(returnData.rows.item(0).userid, returnData.rows.item(0).password);
	   }
   });
}
