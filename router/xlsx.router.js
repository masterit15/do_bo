import {Router} from 'express'
const router = Router()
import path from 'path'
const __dirname = path.resolve('./')
import xlsx from '../controllers/xlsx.controller.js';

import multer from 'multer'
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, `${__dirname}/uploads/`);
  },
  filename: (req, file, cb) =>{
    let fileType = file.originalname.split(".").pop()
    if(fileType.toLocaleLowerCase().includes('zr')){
      cb(null, file.originalname);
    }else if(fileType.toLocaleLowerCase().includes('xls')){
      cb(null, `all.${fileType}`);
    }
  }
});
const upload = multer({ storage: storageConfig })

router.post('/upgradebase', upload.array('xslx'), xlsx.upgradeDB)
router.post('/upload_zr', upload.array('zr_file'), xlsx.readZR)

export default router