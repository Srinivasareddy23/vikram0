import Error from "../../utils/error/error.js";
import { Manager } from "../../schemas/manager/managerRegister.js";

const getManagerDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(Error(400, "Invalid ID provided"));
    }

    const manager = await Manager.findById(id);

    if (!manager) {
      return next(Error(404, "No manager found with this ID"));
    }

    return res.json({
      status: "success",
      data: manager,
    });
  } catch (error) {
    console.error(error);
    return next(Error(500, "Internal server error"));
  }
};

export default getManagerDetails;
