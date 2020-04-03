const db = require("../../config/connect");
const bcryt = require("bcrypt");

const connection = async () => await db.getConnection();

let hitcount;
module.exports = {
 createuser: (data, callBack) => {
  console.log((hitcount = hitcount + 1));
  //console.log(data.password);
  let pwhash = bcryt.hashSync(data.password, bcryt.genSaltSync(10));
  //console.log(pwhash);
  connection()
   .then(conn =>
    conn.execute(
     `insert into users(name,email,password) values (?,?,?)`,
     [data.name, data.email, pwhash],
     (error, result) => {
      if (error) {
       //console.log(error);
       return callBack(error);
      }

      return callBack(null, result);
     }
    )
   )
   .catch(error => {
    return callBack(error);
   });
 }, // end createuser object

 getuserbyemail: (email, callBack) => {
  // find user from database
  connection()
   .then(conn =>
    conn.execute(
     `Select * from users where email=?`,
     [email],
     (err, res, fields) => {
      if (err) {
       return callBack(err);
      }
      if (res) {
       return callBack(null, res[0]);
      }
      return callBack(null, null);
     }
    )
   )
   .catch(error => {
    return callBack(error);
   });
 },
 getuserbyid: (id, callBack) => {
  const userid = id;
  connection()
   .then(conn =>
    conn.execute(
     `Select id,name,email from users where id=?`,
     [userid],
     (err, res, fields) => {
      if (err) {
       return callBack(err);
      }
      //console.log(res[0]);
      return callBack(null, res[0]);
     }
    )
   )
   .catch(err => {
    return callBack(error);
   });
 }
 /* 
 getUsers: callBack => {
  connection
   .then(conn => conn.execute(``, [], (error, results) => {}))
   .catch(error => {
    return callBack(error);
   });
 } */
};
