var express = require('express');
var router = express.Router();
const axios = require('axios');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET photos page */
router.get('/photos', async function (req, res, next) {
  const URL = 'http://localhost:4444/rest/fotos/findAll/json'
  const response = await axios.get(URL);
  res.render('fotos', { title: 'Fotos', foto: response.data });
});

router.get('/photos/add', function (req, res, next) {
  res.render('fotos_formulario', { title: 'Express', foto:null });
});

router.post('/photos/save', async function (req,
  res, next) {
  let { title, description, rate, route } = req.body

  const URL = 'http://localhost:4444/rest/fotos/save'
  let data = {
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: 'public/images/'+ route
  }

  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }

  const response = await axios.post(URL, data, config);
  if (response.status == '200' &&
    response.statusText == 'OK') {
    res.redirect('/photos')
  } else {
    res.redirect('/')
  }
});

router.get('/photos/edit/:id', async function (req, res, next) {
  let id = parseInt(req.params.id);
  const URL = 'http://localhost:4444/rest/fotos/findById/'+id+'/json';

  const response = await axios.get(URL);
  res.render('fotos_formulario', { title: 'Edit Foto', foto: response.data });
});

router.post('/photos/update', async function (req, res, next) {

  let {id, title, description, rate, route } = req.body;

  const URL = 'http://localhost:4444/rest/fotos/update';

  let data = {
    id: id,
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: 'public/images/'+ route
  }

  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }

  const response = await axios.put(URL, data, config);
  if (response.status == '200' && response.statusText == 'OK') {
    res.redirect('/photos')
  } else {
    res.redirect('/')
  }

});

router.get('/photos/delete/:id', async function (req, res, next) {
  let id = parseInt(req.params.id);
  const URL = 'http://localhost:4444/rest/fotos/delete/' + id;

  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }

  const response = await axios.delete(URL, config);
  if (response.status == '200' && response.statusText == 'OK') {
    res.redirect('/photos')
  } else {
    res.redirect('/')
  }

});

module.exports = router;
