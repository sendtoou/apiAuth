const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  facebookId: String,
  displayName: String,
  email: String,
  picture: String
});

// userSchema.pre('save', async function(next) {
//   try{
//     if (this.method !== 'local') {
//       next()
//     }
//       const salt = await bcrypt.genSalt(10)
//       const passwordHash = await bcrypt.hash(this.local.password, salt)
//       this.local.password = passwordHash
//       next()
//   }catch(error){
//       next(error)
//   }
// })

// userSchema.methods.isValidPassword = async function(newPassword) {
//   try{
//       return await bcrypt.compare(newPassword, this.local.password)
//   }catch(error) {
//       throw new Error(error)
//   }
// }

const User = mongoose.model('user', userSchema);
module.exports = User;