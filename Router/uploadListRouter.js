const express = require("express")
const router = express.Router();
const app = express();
const multer = require('multer');
const morgan  = require('morgan');
const helmet = require('helmet');
const M3ulist = require("../Models/M3ulist");
const path = require("path");
const fs = require("fs");
app.use(helmet());
app.use(morgan("common"));



const m3ufileStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "m3ulist");
    },
    filename:(req,file,cb) => {
        cb(null,req.body.name);
    }
})



const uploadm3ufileStorage = multer({storage: m3ufileStorage})




 

  

router.post('/upload/m3ufile', uploadm3ufileStorage.single('file'), async (req,res) => {
    const {secret_id, list_name} = req.query;

    try{
      
         if(!secret_id && !list_name ){
            return res.status(400).json("Invalid Parameters or Something else");
         }

         

          

          
          const playlist = new M3ulist({
             listname: list_name,
             originalName: req.body.name || "",
             ownerId:secret_id,
          })
       const playlistSaver = await playlist.save();
        return res.status(200).json({playlist: playlistSaver, Message: "M3u file upload successfully !"});
    }catch(err){
        return res.status(500).json("File is not uploaded")
    }
    
})


router.delete('/delete/m3ufile/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const playlist = await M3ulist.findById(id);
      if (!playlist) {
        return res.status(404).json("Playlist not found");
      }

      const filePath = path.join(__dirname, '../m3ulist', playlist.originalName);
      if (fs.existsSync(filePath)) {
        // File exists, proceed with deletion
        fs.unlink(filePath, async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Error deleting the file");
          }
      
          await M3ulist.findByIdAndRemove(id);
          return res.status(200).json("File deleted successfully");
        });
      } else {
        // File does not exist
        return res.status(404).json("File not found");
      } 
      
    
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error deleting the file");
    }
  });



module.exports = router;
