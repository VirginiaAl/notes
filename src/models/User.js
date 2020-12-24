const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
//cifra la contraseña
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
//compara la contraseña con la cifrada (devuelve true o false)
UserSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

module.exports = model("User", UserSchema);
