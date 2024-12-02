import Error from "../../utils/error/error.js";
import { Employee } from "../../schemas/employees/employeeRegister.js";

const getTeamleadDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(Error(400, "Invalid ID provided"));
    }

    const teamlead = await Employee.findById(id);

    if (!teamlead) {
      return next(Error(404, "No teamlead found with this ID"));
    }

    return res.json({
      status: "success",
      data: teamlead,
    });
  } catch (error) {
    console.error(error);
    return next(Error(500, "Internal server error"));
  }
};

export default getTeamleadDetails;
