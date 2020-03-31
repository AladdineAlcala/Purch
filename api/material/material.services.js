const db = require("../../config/connect");

async function get_connection() {
 return await db.getConnection();
}

const connection = get_connection();

module.exports = {
 getmaterials: callBack => {
  connection
   .then(db =>
    //console.log(connection);
    db.execute(
     `select matid,matdesc,unit from material`,
     [],
     (error, results) => {
      if (error) {
       return callBack(error);
      }
      //db.release();
      return callBack(null, results);
     }
    )
   )
   .catch(error => {
    console.log(error);
   });
 },
 getmaterialbyid: (id, callBack) => {
  connection
   .then(db =>
    //console.log(connection);
    db.execute(
     `select matid,matdesc,unit from material where matid=?`,
     [id],
     (error, results) => {
      if (error) {
       return callBack(error);
      }
      db.release();
      return callBack(null, results);
     }
    )
   )
   .catch(error => {
    console.log(error);
   });
 },

 create: (data, callBack) => {
  connection
   .then(db =>
    //console.log(connection);
    db.execute(
     `insert into material(matdesc,unit) values (?,?)`,
     [data.matdesc, data.unit],
     (error, results) => {
      if (error) {
       return callBack(error);
      }
      db.release();
      return callBack(null, results);
     }
    )
   )
   .catch(error => {
    console.log(error);
   });
 }, //end of create function
 removematerial: (id, callBack) => {
  connection
   .then(db =>
    //console.log(connection);
    db.execute(`delete from material where matid=?`, [id], (error, results) => {
     if (error) {
      return callBack(error);
     }
     db.release();
     return callBack(null, results);
    })
   )
   .catch(error => {
    console.log(error);
   });
 }
};
