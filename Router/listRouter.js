
const router = require('express').Router();

const M3ulist = require('../Models/M3ulist');


router.get("/playlists/:secretId", async (req,res) => {
   try{ 
   const {secretId} =   req.params

    const playlist = await M3ulist.find({
        ownerId:{$all: secretId}
    })
    if(!playlist){
      return  res.status(304).json("You don't have any playlist")
    }
      

      res.status(200).json(playlist)

   }catch(err){
    res.status(500).json(err)
   }
 
})


module.exports= router;