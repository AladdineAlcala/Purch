const jwtstrategy = require("passport-jwt").Strategy;
const jwtextract = require("passport-jwt").ExtractJwt;
const db = require("../config/connect");
const { getuserbyid } = require("../api/user/user.services");
const keys = process.env.SECRET;
const opts = {};

async function get_connection() {
 return await db.getConnection();
}

//get database connection async
const connection = get_connection();

opts.jwtFromRequest = jwtextract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
 passport.use(
  new jwtstrategy(opts, (jwt_payload, done) => {
   const userid = jwt_payload.id;
   getuserbyid(userid, (err, result) => {
    if (err) {
     console.log(err);
    }
    console.log(result);
   });
  })
 );
};
