import { model, Schema } from 'mongoose';

export const contactsSchema = new Schema({
  //   _id: { type: String },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  isFavourite: { type: Boolean, default: false },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    required: true,
    default: 'personal',
  },
});
export const ContactsCollection = model('contacts', contactsSchema);
