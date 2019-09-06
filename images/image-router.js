const axios = require('axios');

const router = require('express').Router();

router.get('/', (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://res.cloudinary.com/morganart', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching images', error: err });
    });
});

router.post('/', (req, res) => {
    const requestOptions = {
      headers: { accept: 'application/json' },
    };
  
    axios
      .post('curl https://api.cloudinary.com/v1_1/morganart/auto/upload', requestOptions)
      .then(response => {
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error adding images', error: err });
      });
  });




  router.delete('/', (req, res) => {
    const requestOptions = {
      headers: { accept: 'application/json' },
    };
  
    axios
      .delete(`	https://api.cloudinary.com/v1_1/morganart/auto/destroy`, requestOptions)
      .then(response => {
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error deleting images', error: err });
      });
  });







module.exports = router;