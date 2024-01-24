const express=require('express');
const router= express.Router();

router.post('/signup', async (req, res) => {

  
    try {

        
     
    
      res.json({ message: 'Signed in successfully' });
    } catch (error) {
      console.error('Error signing in :', error);
      res.status(500).json({ error: 'Failed to sign in' });
    }
  });


module.exports=router;