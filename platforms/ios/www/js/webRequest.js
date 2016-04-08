var webUrlDeviceRegister = "http://58.26.26.8/MobileApp/DirectLogin.aspx";
var webUrl = "http://58.26.26.8/MobileApp/DirectLogin.aspx";
var webUrlmenu = "http://58.26.26.8/MobileApp/Menu.aspx";
var webUrlLeave = "http://58.26.26.8/MobileApp/Leave/LeaveApprovalList.aspx";
var webUrlLeaveApproveOne = "http://58.26.26.8/MobileApp/Leave/LeaveApprove.aspx";
var webUrlLeaveRejectOne = "http://58.26.26.8/MobileApp/Leave/LeaveReject.aspx";
var webUrlLeaveApproveAll = "http://58.26.26.8/MobileApp/Leave/LeaveApproveAll.aspx";

var apiTimeout=50000;

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
    	var output = "";
    	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    	var i = 0;

    	input = Base64._utf8_encode(input);

    	while (i < input.length) {

    		chr1 = input.charCodeAt(i++);
    		chr2 = input.charCodeAt(i++);
    		chr3 = input.charCodeAt(i++);

    		enc1 = chr1 >> 2;
    		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    		enc4 = chr3 & 63;

    		if (isNaN(chr2)) {
    			enc3 = enc4 = 64;
    		} else if (isNaN(chr3)) {
    			enc4 = 64;
    		}

    		output = output +
    		this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
    		this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    	}

    	return output;
    },

    // public method for decoding
    decode : function (input) {
    	var output = "";
    	var chr1, chr2, chr3;
    	var enc1, enc2, enc3, enc4;
    	var i = 0;

    	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    	while (i < input.length) {

    		enc1 = this._keyStr.indexOf(input.charAt(i++));
    		enc2 = this._keyStr.indexOf(input.charAt(i++));
    		enc3 = this._keyStr.indexOf(input.charAt(i++));
    		enc4 = this._keyStr.indexOf(input.charAt(i++));

    		chr1 = (enc1 << 2) | (enc2 >> 4);
    		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    		chr3 = ((enc3 & 3) << 6) | enc4;

    		output = output + String.fromCharCode(chr1);

    		if (enc3 != 64) {
    			output = output + String.fromCharCode(chr2);
    		}
    		if (enc4 != 64) {
    			output = output + String.fromCharCode(chr3);
    		}

    	}

    	output = Base64._utf8_decode(output);

    	return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
    	string = string.replace(/\r\n/g,"\n");
    	var utftext = "";

    	for (var n = 0; n < string.length; n++) {

    		var c = string.charCodeAt(n);

    		if (c < 128) {
    			utftext += String.fromCharCode(c);
    		}
    		else if((c > 127) && (c < 2048)) {
    			utftext += String.fromCharCode((c >> 6) | 192);
    			utftext += String.fromCharCode((c & 63) | 128);
    		}
    		else {
    			utftext += String.fromCharCode((c >> 12) | 224);
    			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    			utftext += String.fromCharCode((c & 63) | 128);
    		}

    	}

    	return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
    	var string = "";
    	var i = 0;
    	var c = c1 = c2 = 0;

    	while ( i < utftext.length ) {

    		c = utftext.charCodeAt(i);

    		if (c < 128) {
    			string += String.fromCharCode(c);
    			i++;
    		}
    		else if((c > 191) && (c < 224)) {
    			c2 = utftext.charCodeAt(i+1);
    			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    			i += 2;
    		}
    		else {
    			c2 = utftext.charCodeAt(i+1);
    			c3 = utftext.charCodeAt(i+2);
    			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    			i += 3;
    		}

    	}

    	return string;
    }

}

function make_base_auth(user, password) {
  //alert(user);
  //alert(password);
  var tok = user + ':' + password;
  var hash = Base64.encode(tok);
  //alert("this is:" + hash);
  //alert(hash);
  return "Basic " + hash;
}

function postLogin(username, password, regId, devicePlatform, imei){
 //alert('lai');
 //alert(username);
 //alert(password);
   $.support.cors = true;
   var requestUrl=webUrl + "?ID="+username+"&PW="+password+"&RID="+regId+"&IMEIID="+imei+"&PLATFORM="+devicePlatform; 
    $.ajax({
      url: requestUrl,
      type: "POST",
      contentType: "application/json; charset=utf-8",
	  dataType:"json",
	  timeout: apiTimeout,  
	  beforeSend : function(req) {
             req.setRequestHeader('Authorization', make_base_auth (username, password));
      },     
	  success: function(data, status, xhr){
		    //alert('wow');
		    //alert(data.message);
			if(data.message == 'Logon Success')
			{
				storeProfile(username, password);
			}
			else
			{
				alert(data.message);
				navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
			}
			loading.endLoading();
	 },
	 error: function(xhr, ajaxOptions, thrownError) {
		  alert('Some error when connect to server.('+ajaxOptions+','+thrownError+')');
		  loading.endLoading();
	 }
    });
}

function postMenu(username, password){
   $.support.cors = true;
   var requestUrl=webUrlmenu + "?ID="+username+"&PW="+password; 
    $.ajax({
      url: requestUrl,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType:"json",
	  timeout: apiTimeout,
	  beforeSend : function(req) {
             req.setRequestHeader('Authorization', make_base_auth (username, password));
      },     
	  success: function(data, status, xhr){
			if(data.message == 'Logon Success')
			{
				//storeProfile(username, password);
			}
			else
			{
				//alert(data.message);
				navigator.notification.alert("No Profile, please relogin again.", function(){}, "Mewah Group", "Ok");
			}
			loading.endLoading();
	  },
	  error: function(xhr, ajaxOptions, thrownError) {
		  alert('Some error when connect to server.('+ajaxOptions+','+thrownError+')');
		  loading.endLoading();
	  }
    });
}

function storeProfile(username, password) {
    
	var db = window.openDatabase("Database", "1.0", "MewahGroup", 200000);
	var profile = {
		values1 : [username,password]
    };
	
	insertProfile(profile);
 
    function insertProfile(profile) {
		db.transaction(function(tx) {
			tx.executeSql('DROP TABLE IF EXISTS userprofile');
            tx.executeSql('CREATE TABLE IF NOT EXISTS userprofile (userid text, password text)');
            tx.executeSql('DELETE FROM userprofile');
            tx.executeSql(
                'INSERT INTO userprofile (userid, password) VALUES (?, ?)', 
                profile.values1,
                successLogin,
                errorLogin
            );
            //alert(username);
			//alert(password);
        });
    }
}

function errorLogin(err){
     //alert('Error insert: '+err.message);
     alert('Error insert: '+err.message);
	 loading.endLoading();
}

function successLogin(){
    //alert('insert success');
    loading.endLoading();
	window.location="menu.html";
}



//**********************************************************************************//

function loadleaverecord(){
    $.support.cors = true;
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		   var requestUrl=webUrlLeave + "?ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password; 
			$.ajax({
			  url: requestUrl,
			  type: "POST",
      		  contentType: "application/json; charset=utf-8",
	  		  dataType:"json",
			  timeout: apiTimeout, 
			  beforeSend : function(req) {
             	req.setRequestHeader('Authorization', make_base_auth (returnData.rows.item(0).userid, returnData.rows.item(0).password));
      		  },    
			  success: function(data, status, xhr){
					//alert(data.length);
					for (var x = 0; x < data.length; x++) {
						$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td rowspan='2'><h1 class='listviewitemtitleLV'>"+ data[x].Name +" ("+data[x].Department+") </h1><p class='listviewitemdetails1LV'>"+data[x].From_date+" ~ "+data[x].To_date+"</p><p class='listviewitemdetails2LV'>"+data[x].Leave_type+"</p><p class='listviewitemdetails3LV'>Reason : "+data[x].Reason+"</p></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('"+data[x].tbl+"', '"+data[x].refno+"');\" ></td></tr><tr><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('"+data[x].tbl+"', '"+data[x].refno+"');\"></td></tr></table></li>");
					}
					//loading.endLoading();
					
			  },
			  error: function(xhr, ajaxOptions, thrownError) {
				  alert('Some error when connect to server.('+ajaxOptions+','+thrownError+')');
				  //$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td><h1 class='listviewitemtitleLV'>LEE JIAN HAO IS A TESTER (HUMAN RESOURCES & ADMIN)</h1></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('12', '12');\" ></td></tr><tr><td><p class='listviewitemdetails1LV'>2016-04-03 ~ 2016-04-10</p><p class='listviewitemdetails2LV'>Business Trip</p><p class='listviewitemdetails3LV'>Reason : To Develop Mobile App for Android and IOS platform, Mewaholeo Industries Sdn Bhd</p></td><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('12', '12');\"></td></tr></table></li>");
				  //$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td><h1 class='listviewitemtitleLV'>LEE JIAN HAO (IT)</h1></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('12', '12');\" ></td></tr><tr><td><p class='listviewitemdetails1LV'>2016-04-03 ~ 2016-04-10</p><p class='listviewitemdetails2LV'>Business Trip</p><p class='listviewitemdetails3LV'>Reason : To Develop Mobile App for Android and IOS platform, Mewaholeo Industries Sdn Bhd</p></td><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('12', '12');\"></td></tr></table></li>");
				  //$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td><h1 class='listviewitemtitleLV'>LEE JIAN HAO (IT)</h1></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('12', '12');\" ></td></tr><tr><td><p class='listviewitemdetails1LV'>2016-04-03 ~ 2016-04-10</p><p class='listviewitemdetails2LV'>Business Trip</p><p class='listviewitemdetails3LV'>Reason : To Develop Mobile App for Android and IOS platform, Mewaholeo Industries Sdn Bhd</p></td><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('12', '12');\"></td></tr></table></li>");
				 
				  //loading.endLoading();
			  }
			});
	   }
	});
}

function postapproveall(){
    $.support.cors = true;
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		    //alert(returnData.rows.item(0).userid);
			//alert(returnData.rows.item(0).password);
		    var requestUrl=webUrlLeaveApproveAll + "?ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password;
			$.ajax({
			  url: requestUrl,
			  type: "POST",
      		  contentType: "application/json; charset=utf-8",
	  		  dataType:"json",
			  timeout: apiTimeout,
			  beforeSend : function(req) {
             		req.setRequestHeader('Authorization', make_base_auth (returnData.rows.item(0).userid, returnData.rows.item(0).password));
      		  },      
			  success: function(data, status, xhr){
					if(data.message == 'Approve All Done')
					{
						navigator.notification.alert("Approve All Successfully", function(){}, "Mewah Group", "Ok");
						window.history.back();
					}
					else
					{
						navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
					}
			 },
			 error: function(xhr, ajaxOptions, thrownError) {
				  alert('Some error when connect to server.('+ajaxOptions+','+thrownError+')');
			 }
			});
	   }
   });
}

function postapproveone(tbl, refno){
	//alert(tbl);
	//alert(refno);
	$.support.cors = true;
	if(tbl=='PGleaveDetail'){
		tbl  = 'PGLeaveDetail';
	}
	
	if(tbl=='leaveDetail'){
		tbl  = 'LeaveDetail';
	}
	
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		    //alert(returnData.rows.item(0).userid);
			//alert(returnData.rows.item(0).password);
		    var requestUrl=webUrlLeaveApproveOne + "?ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password+"&TBL="+tbl+"&Refno="+refno;
			$.ajax({
			  url: requestUrl,
			  type: "POST",
      		  contentType: "application/json; charset=utf-8",
	  		  dataType:"json",
			  timeout: apiTimeout,
			  beforeSend : function(req) {
             		req.setRequestHeader('Authorization', make_base_auth (returnData.rows.item(0).userid, returnData.rows.item(0).password));
      		  },     
			  success: function(data, status, xhr){
					loading.endLoading();
					
					if(data.message == 'Approve Done')
					{
						navigator.notification.alert("Approve Successfully", function(){}, "Mewah Group", "Ok");
					    location.reload();
					}
					else
					{
						navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
					}
			  },
			  error: function(xhr, ajaxOptions, thrownError) {
				  alert('Some error when connect to server.('+ajaxOptions+','+thrownError+')');
				  loading.endLoading();
			  }
			});
	   }
   });
}

function postrejectone(tbl, refno){
    $.support.cors = true;
	if(tbl=='PGleaveDetail'){
		tbl  = 'PGLeaveDetail';
	}
	
	if(tbl=='leaveDetail'){
		tbl  = 'LeaveDetail';
	}
	
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		    //alert(returnData.rows.item(0).userid);
			//alert(returnData.rows.item(0).password);
		    var requestUrl=webUrlLeaveRejectOne + "?ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password+"&TBL="+tbl+"&Refno="+refno;
			$.ajax({
			  url: requestUrl,
			  type: "POST",
      		  contentType: "application/json; charset=utf-8",
	  		  dataType:"json",
			  timeout: apiTimeout,
			  beforeSend : function(req) {
             		req.setRequestHeader('Authorization', make_base_auth (returnData.rows.item(0).userid, returnData.rows.item(0).password));
      		  },     
			  success: function(data, status, xhr){
					loading.endLoading();
					if(data.message == 'Reject Done')
					{
						navigator.notification.alert("Reject Successfully", function(){}, "Mewah Group", "Ok");
					    location.reload();
					}
					else
					{
						navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
					}
			  },
			  error: function(xhr, ajaxOptions, thrownError) {
				  alert('Some error when connect to server.('+ajaxOptions+','+thrownError+')');
				  loading.endLoading();
			  }
			});
	   }
   });
}



//************************************************************************************/


function postDevice(registerID, devicePlatform, imei){
   var requestUrl=webUrlDeviceRegister; 
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
	  data:"regID="+registerID+"&platform="+devicePlatform+"&imei="+imei,
		timeout: apiTimeout,    
		success: function(data){
			if(data.message == 'Logon Success')
			{
				storeProfile(username, password);
			}
			else
			{
				//alert(data.message);
				navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
			}
			loading.endLoading();
		},
		error: function(xhr, status, error) {
		  alert(status);
		  loading.endLoading();
		}
    });
}
