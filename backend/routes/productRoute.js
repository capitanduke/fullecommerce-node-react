import express from 'express';
import Product from '../models/productModel';

const router = express.Router();

  router.post('/upload', async (req, res) => {

    const product = new Product({
      
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      count: req.body.count,
      description: req.body.description,
      rating: req.body.rating,
      reviews: req.body.reviews,
      
    });

    const newProduct = await product.save();

    if (newProduct) {
      res.send({
        _id: newProduct.id,
        name: newProduct.name,
        image: newProduct.image,
        brand: newProduct.brand,
        price: newProduct.price,
        category: newProduct.category,
        count: newProduct.count,
        description: newProduct.description,
        rating: newProduct.rating,
        reviews: newProduct.reviews,
      });
    } else {
      res.status(401).send({ message: 'Invalid Product Data.' });
    }

  });

  router.get('/product-list', async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });
  



export default router;