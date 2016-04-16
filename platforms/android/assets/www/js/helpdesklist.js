
function opendetailshelpdesk(helpdeskrefno, helpdesktypes){
	
	loading.startLoading();
	window.location="helpdeskdetails.html?helpdrefno="+helpdeskrefno+"&helpcategorytype="+helpdesktypes;
}








function callapproveall(){
	navigator.notification.confirm("Are you sure you want to approve all ?", onApproveLeaveAll, "Confirmation", "Yes,No");     
}

function onApproveLeaveAll(button) {
	if(button==2){//If User selected No, then we just do nothing
		return;
	 }else if(button==1){
		postapproveall();
	}
}

function rejectOneByOne(tbl, refno){
	popWindowReject.openPop(tbl, refno);
}


function approveOneByOneCompleted(tbl, refno)
{
	//alert(tbl);
	//alert(refno);
	var remarks=$("#txtleaveremarks").val();
	//alert(remarks);
	loading.startLoading();
	postapproveone(tbl, refno, remarks);
}

function rejectOneByOneCompleted(tbl, refno)
{
	//alert(tbl);
	//alert(refno);
	var remarks=$("#txtleaveremarksreject").val();
	//alert(remarks);
	loading.startLoading();
	postrejectone(tbl, refno, remarks);
}


function closePopupApprove()
{
	popWindowApprove.closePop();
}

function closePopupReject()
{
	popWindowReject.closePop();
}




