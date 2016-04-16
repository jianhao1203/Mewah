
function approveHelpDesk(jenishelpdesk, refno){
    alert(jenishelpdesk);
    alert(refno);
	popWindowHelpDeskApprove.openPop(jenishelpdesk, refno);
}


function rejectHelpDesk(jenishelpdesk, refno){
	alert(jenishelpdesk);
    alert(refno);
	popWindowHelpDeskReject.openPop(jenishelpdesk, refno);
}


function approveOneByOneHelpDeskCompleted(jenishelpdesk, refno)
{
	var remarks=$("#txtAreaApproveHelpDesk").val();
	loading.startLoading();
	posthelpdeskapprove(jenishelpdesk, refno, remarks);
}

function rejectOneByOneHelpDeskCompleted(jenishelpdesk, refno)
{
	var remarks=$("#txtAreaRejectHelpDesk").val();
	loading.startLoading();
	posthelpdeskreject(jenishelpdesk, refno, remarks);
}


function closePopupHelpDeskApprove()
{
	popWindowHelpDeskApprove.closePop();
}

function closePopupHelpDeskReject()
{
	popWindowHelpDeskReject.closePop();
}




