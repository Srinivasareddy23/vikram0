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
