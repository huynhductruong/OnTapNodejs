import multer  from "multer"
import {imgService} from '../services/index.js'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, 'E:/Web/OnTapNodejs/imgaes');
    } catch (error) {
      cb("Khong tim thay duong dan")
    }
  },
  filename: async (req, file, cb) => {
    try {
      let files = await imgService.readdirAsync('E:/Web/OnTapNodejs/imgaes')
      let imgName = files.length +1
      imgName = imgName+'.jpg'
      req.imgName = imgName
      cb(null, imgName);
    } catch (error) {
      cb(error)
    }
  }
});
const upload = multer({ storage });
export default  upload


