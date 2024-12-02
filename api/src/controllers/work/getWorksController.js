import { Work } from "../../schemas/work/workSchema.js";

export const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find({}, 'name pdf deadline message status createdAt')
    
    if (!works || works.length === 0) {
      return res.status(404).json({ message: "No works found" });
    }

    res.status(200).json({
      success: true,
      data: works,
    });
  } catch (error) {
    console.error("Error fetching works:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not retrieve works.",
    });
  }
};

export const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;

    const works = await Work.find({ employeeId: id }, 'name pdf deadline message status createdAt');
    
    if (!works || works.length === 0) {
      return res.status(404).json({ message: "No work found with the given ID" });
    }

    res.status(200).json({
      success: true,
      data: works,
    });
  } catch (error) {
    console.error("Error fetching work:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not retrieve work.",
    });
  }
};

export const updateWorkById = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 

    const validStatuses = ['assigned', 'ongoing', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Allowed values are: 'assigned', 'ongoing', 'completed'.",
      });
    }

    const updatedWork = await Work.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } 
    );

    if (!updatedWork) {
      return res.status(404).json({
        success: false,
        message: "No work found with the given ID.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Work status updated successfully.",
      data: updatedWork,
    });
  } catch (error) {
    console.error("Error updating work status:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not update work status.",
    });
  }
};

