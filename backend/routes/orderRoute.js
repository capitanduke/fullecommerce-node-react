import express from 'express';
import Order from '../models/orderModel';
import { isAuth } from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});

router.get("/:id", isAuth, async(req, res) =>{
    const order = await Order.findOne({_id: req.params.id});
    if(order){
        res.send(order);
    } else {
        res.status(404).send({message: "Order not found"});
    }
});

router.get("/mine/:id", isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
});


router.post("/", isAuth, async(req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save(); 
    res.status(201).send({message: "New Order Created", data: newOrderCreated });   
});

router.get("/delete/:id", isAuth, async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.find({_id: orderId});
    if(order){
        await Order.remove();
        res.send({ message: 'Order Deleted' });
    } else {
        res.send({ message: 'Error deleting order' });
    }
});

export default router;