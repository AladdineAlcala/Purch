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
 }, // end createuser object
 getuserbyemail: (data, callBack) => {
  const loguser = {
   email: data.email,
   password: data.password
  };

  // find user from database
  connection
   .then(conn =>
    conn.execute(
     `Select * from users where email=?`,
     [loguser.email],
     (err, res, fields) => {
      if (err) {
       throw err;
      }
      return callBack(null, res[0]);
     }
    )
   )
   .catch(error => {
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

/* function hashPassword(datapass,callBack){
      const saltRounds=10;
      bcrypt.hash(datapass, saltRounds, function(err, hash) {
         if(err){
           return callBack(err)
         }
            return callBack(hash);
      });
} */
