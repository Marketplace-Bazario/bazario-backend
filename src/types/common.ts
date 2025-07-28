export type MulterFiles = Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined;
