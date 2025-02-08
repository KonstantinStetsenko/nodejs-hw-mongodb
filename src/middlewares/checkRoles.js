import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { ROLES } from '../constants/constSort.js';
import { ContactsCollection } from '../db/models/contacts.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;

    console.log('User:', user);
    console.log('Allowed roles:', roles);
    console.log('User role:', user.role);
    console.log('Checking parent access, params:', req.params);

    console.log('User role:', user.role);
    console.log('Contact ID:', req.params.contactId);
    console.log('Parent ID:', req.user._id);

    if (!user) {
      next(createHttpError(401, 'Unauthorized: User not found'));
      return;
    }

    if (roles.includes(ROLES.TEACHER) && user.role === ROLES.TEACHER) {
      console.log('Access granted: TEACHER');
      next();
      return;
    }

    if (roles.includes(ROLES.PARENT) && user.role === ROLES.PARENT) {
      console.log('Checking parent access, params:', req.params);

      if (!req.params.contactId) {
        next(createHttpError(403, 'Forbidden: No contactId provided'));
        return;
      }

      try {
        const contactId = new mongoose.Types.ObjectId(req.params.contactId);
        const contact = await ContactsCollection.findOne({
          _id: contactId,
          userId: req.user._id,
        });

        console.log('MongoDB search result:', contact);

        if (contact) {
          console.log('Access granted: Parent of student', contact);
          next();
          return;
        }
      } catch (error) {
        console.error('MongoDB error:', error);
        next(createHttpError(400, 'Invalid contact ID format'));
        return;
      }
    }

    console.log('Access denied: Forbidden');
    next(createHttpError(403, 'Forbidden'));
  };
