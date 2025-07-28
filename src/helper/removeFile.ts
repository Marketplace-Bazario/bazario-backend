import fs from 'fs';
import path from 'path';
import { MulterFiles } from '../types/common';

export const removeFile = async (fileId?: string) => {
  try {
    if (!fileId) return;

    const filePath = path.join(__dirname, '../public/files', fileId);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log('File deleted:', fileId);
    } else {
      console.log('File not found:', fileId);
    }
  } catch (error) {
    console.error('Error with file deleting:', error);
  }
};

export const removeFiles = async (fileIds?: string[]) => {
  try {
    if (!fileIds?.length) return;

    // Handle array of files
    for (const file of fileIds) {
      await removeFile(file);
    }
  } catch (error) {
    console.error('Error with file deleting:', error);
  }
};

export const filterImages = async (images: string | string[], oldImages: string[], fileImages: MulterFiles) => {
  let oldImagesPath = [];
  if (Array.isArray(images)) {
    oldImagesPath = images;
  } else if (typeof images === 'string') {
    oldImagesPath.push(images);
  }

  oldImages.forEach(async (image) => {
    if (!oldImagesPath.includes(image)) {
      await removeFile(image);
    }
  });

  const uploadedFiles = Array.isArray(fileImages) ? fileImages.map((x: any) => x.filename) : [];

  let newImages = [...oldImagesPath, ...uploadedFiles];

  return newImages;
};
