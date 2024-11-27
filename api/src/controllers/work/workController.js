import multer from "multer";
import { Work } from "../../schemas/work/workSchema.js";
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const createWork = async (req, res) => {
  try {
    const { name, selectedTeam, deadline, additionalText } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "File is required" });
    }

    const filePath = req.file.path.replace(/\\/g, '/');

    const fileUrl = `http://localhost:5000/${filePath}`;

    const teamIds = JSON.parse(selectedTeam);

    const works = teamIds.map((id) => ({
      employeeId: id,
      name: name,
      pdf: fileUrl,
      deadline: new Date(deadline),
      message: additionalText,
    }));

    await Work.insertMany(works);

    res.status(201).json({ success: true, message: "Work assigned successfully" });
  } catch (error) {
    console.error("Error assigning work:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const uploadWork = upload.single("file");
