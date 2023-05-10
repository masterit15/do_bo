import {Router} from 'express'
const router = Router()
import fileController from '../controllers/file.controller.js'

import multer from 'multer'
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, `../uploads/`);
  },
  filename: (req, file, cb) =>{
    // let fileType = file.originalname.split(".").pop()
      cb(null, file.originalname);
  }
});
const upload = multer({ storage: storageConfig })

router.post('/upload_files', upload.array('file'), fileController.uploads)

export default router