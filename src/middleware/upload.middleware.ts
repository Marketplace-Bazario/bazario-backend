import multer, { StorageEngine } from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

const uploadDir: string = path.join(__dirname, "../public/files");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = uuidv4() + ext;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});
