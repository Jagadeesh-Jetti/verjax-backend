import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/modules/user/user.model.j';
import dotenv from 'dotenv';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  const exists = await User.findOne({ email: 'admin@localservices.com' });

  if (exists) {
    console.log('Admin already exists');
    process.exit();
  }

  const password = await bcrypt.hash('admin123', 10);

  await User.create({
    name: 'Admin',
    email: 'admin@localservices.com',
    password,
    role: 'admin',
  });

  console.log('Admin created successfully');
  process.exit();
};

seedAdmin();
