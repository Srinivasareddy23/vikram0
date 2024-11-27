import { Employee } from "../../schemas/employees/employeeRegister.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not retrieve employees.",
    });
  }
};

export const getAllTeamLeaders = async (req, res) => {
  try {
    const teamLeaders = await Employee.find({ role: "teamlead" }).select("firstname");

    if (!teamLeaders || teamLeaders.length === 0) {
      return res.status(404).json({ message: "No team leaders found" });
    }

    res.status(200).json({
      success: true,
      data: teamLeaders,
    });
  } catch (error) {
    console.error("Error fetching team leaders:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not retrieve team leaders.",
    });
  }
};


