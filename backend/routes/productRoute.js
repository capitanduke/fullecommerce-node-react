import express from 'express';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../util.js';

const router = express.Router();

  router.get('/', async(req, res) => {
    const products = await Product.find({});
    res.send(products);
  });

  router.get('/:id', async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    if(product){
      res.send(product);
    } else {
      res.status(404).send({message: "The product doesn't exist or something went wrong"});
    }
  });

  router.get('/details/:id', async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    if(product){
      res.send(product);
    } else {
      res.status(404).send({message: "The product doesn't exist or something went wrong"});
    }
  });

  router.post('/upload', isAuth, isAdmin, async (req, res) => {

    const product = new Product({
      
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      reviews: req.body.reviews,
      
    });

    const newProduct = await product.save();

    if (newProduct) {
      return res.status(201).send({ message: 'New product created', data: newProduct });
      
    } else {
      return res.status(501).send({ message: 'Error in creating product' });
    }

  });

  router.put('/upload/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    if(product){
      product.name = req.body.name;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.price = req.body.price;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.rating = req.body.rating;
      product.reviews = req.body.reviews;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res.status(201).send({ message: 'Product updated', data: updatedProduct });
      }
    }

    return res.status(501).send({ message: 'Error in updating product' });

  });

 
  router.delete('/delete/:id', isAuth, isAdmin, async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.status(201).send({ message: 'Product Deleted', data: deletedProduct });
    } else {
      res.status(501).send('Error in Deletion.');
    }

  })
 


export default router;