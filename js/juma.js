var juma = {

    url : "http://127.0.0.1:8086/ble?callback=?",
    device : null, 
    
    emulation_mode : function(value){
        if(!value){
        	console.log('value is not be null');
        	return;
		}
        if(value == 0){
            this.url = "http://127.0.0.1:8086/ble?callback=?";
        }else{
            this.url = "http://www.gatt.io:8080/ble?callback=?";
        }     
    },
    
    scan:function(selector,settings){
        if(!selector){
        	console.log('no selector');
        	return;
        }
        settings = settings || "low latency";
        var params = {
            address : "local",
            resource : "/devices/nearby",
            operation : "read",
            settings : settings
        };
        
        $(selector).html("searching");
        
        $.getJSON(this.url,params,function(data){
            var devices = data['device_list'];

            if (devices.length == 0) {
                $(selector).html('no device found');
                return;
            }

            html_str = "";
            for(var i=0;i<devices.length;i++){
                var device = devices[i];
                var name = device.name;
                var addr = device.address;
                var rssi = device.RSSI;

                html_str += '<label for="device-' + i + '">' + name + ' ' + addr;
                html_str += ' ' + '</label><input type="radio" name="device" id="device-' + i;
                html_str += '" value="' + i + '"></input>';
            }

            $(selector).html(html_str);

            $('input[type="radio"]').checkboxradio();

            for(var i=0;i<devices.length;i++) {
                (function (device) {
                    $('#device-' + i).click(function() {
                        juma.device = device;
                    });
                })(devices[i]);
            }
          });
    },
    
    read : function(resource,success){
    	if(!this.device){
	    	console.log('please select device at first!');
	    	return;
	    }
		if(!resource){
			console.log('resource is not be null!');
			return;
		}
		var params = {
            address : juma.device.address,
            resource : resource,
            operation : "read"
        };
        $.getJSON(this.url, params, function(data){
            if(success)success(data['value']);
        });
    },
    
    write : function(resource,value){
	    if(!this.device){
	    	console.log('please select device at first!');
	    	return;
	    }
		if(!resource){
			console.log('resource is not be null!');
			return;
		}
		if(!value){
			console.log('value is not be null!');
			return;
		}
		var params = {
            address : this.device.address,
            resource : resource,
            operation : "write",
            value : value
        };
        $.getJSON(this.url, params, function(data){
            console.log(JSON.stringify(data));
        });
    }
}