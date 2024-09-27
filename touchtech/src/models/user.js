import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email Already Exists'],
    required: [true, 'Email is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  customwallpaper: [
    {
      imageName: {
        type: String,
        required: true,
      },
      imageURI: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = models.User || model('User', UserSchema);
export default User;