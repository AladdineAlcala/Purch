const db = require("../../config/connect");

var connection;

async function get_connection() {
 return await db.getConnection();
}

module.exports = {
 create: function(data, callback) {
  insertmaterial(data, function(error, result) {
   //console.log(result);
   //console.log(error);

   return callback(error, result);
  });

  //return callback(_error, _result);
  //console.log("return from insert function");
 } //end of create function
};

function insertmaterial(data, callback) {
 const connection = get_connection();
 connection
  .then(db =>
   //console.log(connection);
   db.execute(
    `insert into material(matdesc,unit) values (?,?)`,
    [data.matdesc, data.unit],
    (err, result) => {
     if (err) {
      return callback(err);
     }
     //console.log(result);
     return callback(null, result);
    }
   )
  )
  .catch(err => {
   console.log(err);
  });
}

/*  connection
  .then(db =>
   db.execute(
    `insert into material(matdesc,unit) values (?,?)`,
    [data.matdesc, data.unit],
    (err, result) => {
     if (err) {
      //console.log("from services err");
      //db.release();
      return callback(err);
     }
     //db.release();
     //console.log(result);
     _result = result;
     //return callback(null, result);
    }
   )
  )
  .catch(err => {
   console.log(err);
   return callback(err);
  }); */
