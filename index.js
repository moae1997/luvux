const { client, createTables, createCustomer, createProduct, fetchCustomers, fetchProducts, fetchCart, deleteCart, createCart, fetchCustomer, fetchProduct, createCartHistory, fetchCartHistory, fetchCustomerEmail } = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT || "fmyumchsymxgnbfgtmugfnym";


app.post('/api/register', async(req,res,next)=> {
    try {
        const checkCustomer = await fetchCustomerEmail(req.body.email);
        if(!checkCustomer) {
            const newCostomer = await createCustomer(req.body);
        const token = jwt.sign(newCostomer.id, SECRET);
        res.send({token, newCostomer});
        } else {
            res.send("try loggin in!")
        }
    } catch(ex){
        next(ex); 
    } 
});

app.post('/api/login', async(req,res,next)=> {
    try {
        const checkCustomer = await fetchCustomerEmail(req.body.email);
        if(!checkCustomer) {
            res.send("Sorry not a customer, try signing up");
        } else if (!(await bcrypt.compare(req.body.password, checkCustomer.password))) {
            res.send("try loggin in!")
        } else {
            const token = jwt.sign(checkCustomer.id, SECRET);
            res.send({token, checkCustomer});
        }
    } catch(ex){
        next(ex); 
    } 
});


app.get('/api/customers', async(req, res, next)=> {
    try {
      res.send(await fetchCustomers());
    }
    catch(ex){
      next(ex);
    }
  });


app.get('/api/customer/:id', async(req, res, next)=> {
    try {
      res.send(await fetchCustomer(req.params.id));
    }
    catch(ex){
      next(ex);
    }
  });

  app.get('/api/products', async(req, res, next)=> {
    try {
      res.send(await fetchProducts());
    }
    catch(ex){
      next(ex);
    }
  });

  app.get('/api/product/:id', async(req, res, next)=> {
    try {
      res.send(await fetchProduct(req.params.id));
    }
    catch(ex){
      next(ex);
    }
  });
     
  app.get('/api/customers/:id/cart', async(req, res, next)=> {
    try {
      res.send(await fetchCart(req.params.id));
    }
    catch(ex){
      next(ex);
    }
  });

  app.get('/api/customers/:id/cartHistory', async(req, res, next)=> {
    try {
      res.send(await fetchCartHistory(req.params.id));
    }
    catch(ex){
      next(ex);
    }
  });

  app.post('/api/customers/:id/cart', async(req, res, next)=> {
    try {
      res.status(201).send(await createCart({ customer_id: req.params.id, product_id: req.body.product_id}));
    }
    catch(ex){
      next(ex);
    }
  });

  app.post('/api/customers/:id/cartHistory', async(req, res, next)=> {
    try {
      res.status(201).send(await createCartHistory({ customer_id: req.params.id, product_id: req.body.product_id}));
    }
    catch(ex){
      next(ex);
    }
  });

  app.delete('/api/customers/:customerID/cart/:id', async(req, res, next)=> {
    try {
      await deleteCart({ id: req.params.id, customer_id: req.params.customerID });
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });




  const init = async()=> {
    await client.connect();
    console.log('connected to database');
    await createTables();
  
    const [jo, cathy, bow, blackSeedDounut, bodyScrub, sandlewoodCandle, soap] = await Promise.all([
      createCustomer({ email: 'jo@ly.com', password: 'uxirjgb', name: "jo" }),
      createCustomer({ email: 'cathy', password: 'sieugbi!!', name: "Ahmed" }),
      createCustomer({ email: 'bow', password: 'sfkdjhb', name: "Ahmed"  }),
      createProduct({ name: 'black_seed_dounut', price: 5, imageURL: "", home_made: true}),
      createProduct({ name: 'body_scrub', price: 12, imageURL: "", home_made: true}),
      createProduct({ name: 'sandalewood_candle', price: 49, imageURL: "", home_made: true}),
      createProduct({ name: 'soap', price: 6, imageURL: "", home_made: true}),
      createProduct({ name: 'moitureizer', price: 18, imageURL: "", home_made: true}),
      createProduct({ name: 'honey', price: 10, imageURL: "", animal_product: true}),
      createProduct({ name: 'goat_cheese', price: 7, imageURL: "", animal_product: true}),
      createProduct({ name: 'raw_milk', price: 7, imageURL: "", animal_product: true}),
      createProduct({ name: 'eggs', price: 3, imageURL: "", animal_product: true}),
      createProduct({ name: 'meat', price: 7, imageURL: "", animal_product: true}),
      createProduct({ name: 'watermelon', price: 9, imageURL: "", fruit: true}),
      createProduct({ name: 'strawberries', price: 4, imageURL: "", fruit: true}),
      createProduct({ name: 'golden_apples', price: 15, imageURL: "", fruit: true}),
      createProduct({ name: 'pairs', price: 11, imageURL: "", fruit: true}),
      createProduct({ name: 'peaches', price: 13, imageURL: "", fruit: true}),
      createProduct({ name: 'blueberries', price: 6, imageURL: "", fruit: true}),
      createProduct({ name: 'figs', price: 10, imageURL: "", fruit: true}),
      createProduct({ name: 'lemon', price: 2, imageURL: "", fruit: true}),
      createProduct({ name: 'cherries', price: 20, imageURL: "", fruit: true}),
      createProduct({ name: 'oranges', price: 5, imageURL: "", fruit: true})
    ]);
    const customerCarts = await Promise.all([
      createCart({ customer_id: jo.id, product_id: soap.id}),
      createCartHistory({customer_id: jo.id, product_id: soap.id}),
      createCartHistory({customer_id: jo.id, product_id: soap.id})
    ]);

    const products = await fetchProducts();
    console.log(products);
  
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  
  };
  
  init();