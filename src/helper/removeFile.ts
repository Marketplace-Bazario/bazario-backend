import fs from "fs";
import path from "path";

export const removeFile = async (fileId?: string) => {
  try {
    if (!fileId) return;

    const filePath = path.join(__dirname, "../public/files", fileId);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log("File deleted:", fileId);
    } else {
      console.log("File not found:", fileId);
    }
  } catch (error) {
    console.error("Error with file deleting:", error);
  }
};
