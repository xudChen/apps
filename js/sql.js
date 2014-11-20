var db = openDatabase('bcsphere','','bcsphere',102400);

if(db){ 
   alert('创建成功');
}else{
  alert(' 不支持数据库');
}

var DataBase = {
	
	init : function(){
		this.createTable();
	},

	createTable : function(success,error){
		db.transaction( function(tx) {
			tx.executeSql(
				"create table if not exists apps (id integer primary key autoincrement , name nvarchar(100),address nvarchar(1000),img nvarchar(1000))",
				[],
				function(tx,result){
					if(success){
						success(result);
					}
					console.log('创建apps表成功');
				},
				function(tx, err){
					if(error){
						error(err);
					}
					console.log('创建apps表失败:' + err.message);
				}
			);
		});
	 },

	insert : function(para,success,error){
		db.transaction(function (tx) {
			tx.executeSql(
				"insert into apps (name,address,img) values(?,?,?)",
				para,
				function (tx,result) {
					if(success){
						success(result);
					}
					console.log('添加数据成功');
				},
				function (tx, err) {
					if(error){
						error(err);
					}
					console.log('添加数据失败: ' + err.message);
				}
			);
		});
	},

	query : function(success,error){
		db.transaction(function (tx) {
			tx.executeSql(
				"select * from apps",
				[],
				function (tx, result) {
/* 					console.log(result.rows.item(1)); */
					if(success){
						success(result);
					}
				},
				function (tx, err) {
					if(error){
						error(err);
					}
					console.log('查询失败: ' + err.message);
				} 
			);
		});
	},

	update : function(para,success,error) {
		db.transaction(function (tx) {
			tx.executeSql(
				"update apps set name = ?,address=?,img=? where id= ?",
				para,
				function (tx, result) {
					if(success){
						success(result);
					}
				},
				function (tx, err) {
					if(error){
						error(err);
					}
					console.log('更新失败: ' + err.message);
				}
			);
		});
	},
	
	del : function(id,success,error) {
		db.transaction(function (tx) {
			tx.executeSql(
				"delete from apps where id= ?",
				[id],
				function (tx, result) {
					if(success){
						success(result);
					}
				},
				function (tx, err) {
					if(error){
						error(err);
					}
					console.log('删除失败: ' + err.message);
				}
			);
		});
	},
	
	getCount : function(success,error){
		db.transaction(function(tx){
			tx.executeSql(
				'select count(*) as count from apps',
				[],
				function(tx,result){
					if(success){
						success(result);
					}
				},
				function(tx,err){
					if(error){
						error(err);
					}
					console.log("查询记录总条数失败: "+error.message);
				}
			);
		});
	}
	

}


