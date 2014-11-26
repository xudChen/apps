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

	openDB : function (name,version,introduction,size) {
		if(!window.openDatabase){
			console.log('Your browser does not support SqlLite,Plese try another DataBase!');
			return;
		}		
		this.db = window.openDatabase(name,version,introduction,size);
	},
	
	createTable : function(name,success,error){
		this.db.transaction(function(tx){ 
            tx.executeSql('CREATE TABLE IF NOT EXISTS apps(id integer PRIMARY KEY autoincrement,name nvarchar(1000),address nvarchar(1000),img nvarchar(1000))',[],function(tx,rs){
	            if(success)success(rs);
            },function(tx,rs){
	            if(error)error(rs);
            });
        });
	},
	
	query : function(success,error){
		this.db.transaction(function(tx){
            tx.executeSql('SELECT * FROM apps',[],function(tx,rs){
                if(success)success(rs);
            },function(tx,rs){
	            if(error)error(rs);
            });
        }); 
	},
	
	insert : function(param,success,error){
		this.db.transaction(function(tx){
            tx.executeSql(
            	'INSERT INTO apps (name,address,img) VALUES (?,?,?)',
            	 param,
            	 function(tx,rs){ 
					 if(success)success(rs); 
				 },
				 function(tx,err){
				 	console.log(err.message);
					 if(error)error(rs);
				 }
			);
        });
	},
	
	delete : function(id,success,error){
		this.db.transaction(function (tx) {
			tx.executeSql(
				"delete from apps where id= ?",
				[id],
				function (tx, rs) {
					if(success)success(rs);
				},
				function (tx, err) {
					if(error)error(err);
				}
			);
		});
	},
	
	update : function(param,success,error){
		this.db.transaction(function (tx) {
			tx.executeSql(
				"update stu set name = ?,address=?,img=? where id=?",
				param,
				function (tx, rs) {
					if(success)suceess(rs);
				},
				function (tx, err) {
					if(error)error(err);
				}
			);
		});
	}
}