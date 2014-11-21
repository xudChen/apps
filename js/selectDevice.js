	function init(){
	  var windowWidth = window.innerWidth;
	  var windowHeight = window.innerHeight;	  	  	
	  	  
  	  var _temp_dialog_ = document.createElement('div');	
  	  
  	  _temp_dialog_.setAttribute('id','_temp_dialog_');
  	  _temp_dialog_.setAttribute('style',''+
  	  		'display:block;'+
  	  		'opacity:0.8;'+
  	  		'background-color:black;'+
  	  		'position:absolute;'+
  	  		'z-index:999;'+
  	  		'left:0px;'+
  	  '');
  	  _temp_dialog_.style.top = document.body.scrollTop+'px';
  	  _temp_dialog_.style.width = windowWidth +'px';
  	  _temp_dialog_.style.height = windowHeight +'px';
  	  
  	  var _device_list_ = document.createElement('div');
  	  
  	  _device_list_.setAttribute('style',''+
  	  		'display:block;'+
  	  		'background-color:white;'+
  	  		'position:relative;'+
  	  		'overflow-x:hidden;'+
  	  		'overflow-y:auto;'+
  	  		'opacity:1;'+
  	  '');
  	  
  	  _device_list_.style.width = (windowWidth * 0.75) +'px'; 
  	  
  	  _device_list_.style.height = (windowHeight * 0.75) +'px';
  	  
  	  _device_list_.style.top = (windowHeight/2 - (windowHeight * 0.75)/2)+'px';
  	  
  	  _device_list_.style.left = (windowWidth/2 - (windowWidth*0.75)/2)+'px';
  	  
  	  _device_list_.innerHTML = "<ul id='_device_list_ul_' style='display:block;position:relative;list-style-type:none;text-align:center;margin-top:5px;width:100%;background-color:white'></ul>";
  	  
  	  _temp_dialog_.appendChild(_device_list_);
  	  
  	  var _temp_dialog_close_ = document.createElement('div');
  	  
  	  _temp_dialog_close_.setAttribute("style",''+
  	  		'display:block;'+
  	  		'position:absolute;'+
  	  		'z-index:1000;'+
  	  		'color:red;'+
  	  		'top:5px;'+
  	  		'right:5px;'+
  	  		'opacity:1;'+
  	  '');
  	  
  	  _temp_dialog_close_.innerHTML ="<img src='img/close_btn.png'/>";
  	  _temp_dialog_close_.onclick =function(){
	  	  document.body.removeChild(_temp_dialog_);
  	  }
  	    	    	  
  	  var _refresh_btn_ = document.createElement('img');
  	  
  	  _refresh_btn_.setAttribute('style', 'display:block;margin:0 auto;');
  	  
  	  _refresh_btn_.setAttribute('src', 'img/refresh.png')
  	  
/*   	  _device_list_.appendChild(_refresh_btn_); */
  	  
  	  _temp_dialog_.appendChild(_temp_dialog_close_);

  	  document.body.appendChild(_temp_dialog_);
  }
  
  
  function selectDevice(callback){
  	init();
  	
  	var ble = {
		address : "local",
		resource : "/devices/nearby",
		operation : "read",
		settings : "low latency"
	};

	$.getJSON(url,ble,function(data){

		var _device_list_ul_ = document.getElementById('_device_list_ul_');
		
		var devices = data['device_list'];

		var htmlStr = "";
		
		for(var i=0;i<devices.length;i++){
			var device = devices[i];
			
			var li_element = document.createElement('li');
			
			li_element.setAttribute('style', 'diaplay:block;float:left;width:100%;margin:0 auto;text-align:left;border-bottom:1px solid #ccc;height:80px;');
			(function(device,callback){	
				li_element.onclick = function(){
					DEVICEADDRESS = device.address;
					if(callback){
						callback(device.address);
					}
					
					document.body.removeChild(document.getElementById('_temp_dialog_'));
				}
			})(device,callback);
			li_element.innerHTML = '<h5>'+device.name+'</h5>'+'<p>'+device.address+'</p>';
			
			_device_list_ul_.appendChild(li_element);
		}
	}); 
}
