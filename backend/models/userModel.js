const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    pic: { type: String, default: "https://www.freepik.com/free-vector/illustration-user-avatar-icon_2606572.htm#fromView=keyword&page=1&position=1&uuid=d07efdd5-5ed4-4d79-8c2f-bb1bbb9ee555" },
},
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);

}

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;