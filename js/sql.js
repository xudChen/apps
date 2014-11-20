function clone (jsonObj){
    var buf;
    if (jsonObj instanceof Array) {
        buf = [];
        var i = jsonObj.length;
        while (i--) {
            buf[i] = arguments.callee(jsonObj[i]);
        }
        return buf;
    }else if (typeof jsonObj == "function"){
        return jsonObj;
    }else if (jsonObj instanceof Object){
        buf = {};
        for (var k in jsonObj) {
            buf[k] = arguments.callee(jsonObj[k]);
        }
        return buf;
    }else{
        return jsonObj;
    }
}

var DataBase = {

	init : function(){
	},

	openDB : function (name,version,objectStoreName,success,error) {

		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	
		if (!window.indexedDB) {
			console.log('Your browser does not support IndexedDB,Plese try another DataBase!');
		}
		this.name = objectStoreName;
		
	    var request=window.indexedDB.open(name,version);
	    
	    request.onupgradeneeded = function(e) {
	    	console.log("Upgrading...");
			var db = e.target.result;
			if (!db.objectStoreNames.contains(objectStoreName)) {  
			    var objectStore = db.createObjectStore(objectStoreName, {  
			        // primary key  
			        keyPath: "id",  
			        // auto increment  
			        autoIncrement: true
			    });
				objectStore.createIndex("name", "name", { unique: false });
			}
		}
	    
	    request.onerror=function(e){
	    	console.log('Open Error!');
	    	if(error){
	    		error(e.target.result);
			}
	    };
	    
	    request.onsuccess=function(e){
	        DataBase.db=e.target.result;
	        if(success)success();
	    };
	},	
	
	query : function(success,error){
		var transaction = this.db.transaction([DataBase.name],"readonly");
		var objectStore = transaction.objectStore(DataBase.name);
		var cursor = objectStore.openCursor();
		var data = [];
		
		cursor.onsuccess = function(e) {
		    var result = e.target.result;
			if(result){
				data.push(clone(result));
				result.continue();
			}else{
				return;
			}
		}
		
		cursor.onerror = function(e) {
			if(error)error(e.target.error);
			console.log("getData error ",e.target.error.name);
		}
		
		transaction.oncomplete = function(e){
			console.log('query complete');
			if(success)success(data);
		}
	},
	
	queryByKey : function(key,success,error){
		var transaction = this.db.transaction([DataBase.name],"readwrite");
		var objectStore = transaction.objectStore(DataBase.name);
		var request = objectStore.get(key);
		
		request.onsuccess = function(e) {
		    var result = e.target.result;
		    if(success)success(result);
		}
		
		request.onerror = function(e) {
			if(error)error(e.target.error);
			console.log("getDataByKey error ",e.target.error.name);
		}
	},
	
	insert : function(obj,success,error){
		var transaction = this.db.transaction([DataBase.name],"readwrite");
		var objectStore = transaction.objectStore(DataBase.name);
		var request = objectStore.put(obj);
		
		request.onsuccess = function(e) {
		    var result = e.target.result;
		    if(success)success(result);
		    console.log('add data success!...');
		}
		
		request.complete = function(e){
			
		}
		
		request.onerror = function(e) {
			if(error)error(e.target.error);
			console.log("add data error ",e.target.error.name);
		}
	},
	
	delete : function(key,success,error){
		var transaction = this.db.transaction([DataBase.name],"readwrite");
		var objectStore = transaction.objectStore(DataBase.name);
		var request = objectStore.delete(key);
		
		request.onsuccess = function(e) {
		    if(success)success(e.target.result);
		    console.log('remove data success!...');
		}
		
		request.onerror = function(e) {
			if(error)error(e.target.error);
			console.log("remove data error ",e.target.error.name);
		}
	},
	
	update : function(key,obj,success,error){
		var transaction = this.db.transaction([DataBase.name],"readwrite");
		var objectStore = transaction.objectStore(DataBase.name);
		var request = objectStore.get(key);
		
		request.onsuccess = function(e) {
			e.target.result = obj;
		    if(success)success(e.target.result);
		    console.log('remove data success!...');
		}
		
		request.onerror = function(e) {
			if(error)error(e.target.error);
			console.log("remove data error ",e.target.error.name);
		}
	}
	
}