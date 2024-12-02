import bcrypt from 'bcrypt'; 
import { Employee } from '../../schemas/employees/employeeRegister.js';

export const registerEmployee = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      fathername,
      age,
      email,
      password,
      role,
      aadhar,
      uan,
      address
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !fathername ||
      !age ||
      !email ||
      !password ||
      !role ||
      !aadhar ||
      !uan ||
      !address
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailExist = await Employee.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const aadharExist = await Employee.findOne({ aadhar });
    if (aadharExist) {
      return res.status(400).json({ message: 'Aadhar number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newEmployee = new Employee({
      firstname,
      lastname,
      fathername,
      age,
      email,
      password: hashedPassword,
      role,
      aadhar,
      uan,
      address
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: 'Employee registered successfully',
      data: newEmployee,
    });
  } catch (error) {
    console.error('Error during employee registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not register employee.',
    });
  }
};
