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
            tx.executeSql('CREATE TABLE IF NOT EXISTS apps(id integer PRIMARY KEY autoincrement,appId integer,name nvarchar(100),title nvarchar(200),description nvarchar(1000),icon_url nvarchar(500),app_url nvarchar(500),author nvarchar(100),version double,status nvarchar(10),update_time timestamp,create_time timestamp)',[],function(tx,rs){
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
            	'INSERT INTO apps (appId,name,title,description,icon_url,app_url,author,version,status,update_time,create_time) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
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
				"update apps set appId = ?,name=?,title=?,description=?,icon_url=?,app_url=?,author=?,version=?,status=?,update_time=?,create_time=? where id=?",
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