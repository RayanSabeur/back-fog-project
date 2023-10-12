import multer from 'multer';
import path from "path";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
    // Sets saved filename(s) to be original filename(s)
  })
export const upload = multer({
     storage: storage,
     fileFilter: function(req, file, callback) {
        if (
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg"
          ){
            callback(null, true)
          } else {
                console.log('ya du taff')
            callback(null,false)
          }
         
        } ,
        limites:{
            fileSize: 1024 * 1024 * 2
         }
    
     })
