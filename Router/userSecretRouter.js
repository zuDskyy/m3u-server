const router= require('express').Router();
const User = require("../Models/User");

//create SecretId for all Guest User
router.get('/secretId', async (req,res) => {
    const {secret_id} =  req.query;
      const userfindBySecretId = await User.findOne({secretId :  secret_id});
   if(userfindBySecretId) {
      return res.status(301).json({message:"User Secret Id already exist"});
    }

    const secretId = generateSecretId();
    const user = new User({
      secretId: secretId,
    });
    // Save the user to the database
   await user.save()
      .then(savedUser => {
        // Return the secret ID as JSON response
        res.status(200).json({ secretId });
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
})


function generateSecretId() {
   
    const randomNum = Math.floor(Math.random() * 100000000000000);
    return `id${randomNum}`;
  }


  module.exports = router 