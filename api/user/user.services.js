const db = require("../../config/connect");
const bcryt = require("bcrypt");

async function get_Connection() {
 return await db.getConnection();
}
const connection = get_Connection();

module.exports = {
 createuser: (data, callBack) => {
  //console.log(data.password);
  let pwhash = bcryt.hashSync(data.password, bcryt.genSaltSync(10));
  //console.log(pwhash);
  connection
   .then(conn =>
    conn.execute(
     `insert into users(name,email,password) values (?,?,?)`,
     [data.name, data.email, pwhash],
     (error, result) => {
      if (error) {
       return callBack(error);
      }

      return callBack(null, result);
     }
    )
   )
   .catch(error => {
    return callBack(error);
   });
 } /* , // end createuser object
 getUsers: callBack => {
  connection
   .then(conn => conn.execute(``, [], (error, results) => {}))
   .catch(error => {
    return callBack(error);
   });
 } */
};
