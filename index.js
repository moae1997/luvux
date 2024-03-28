const { client, createTables, createCustomer, createProduct, fetchCustomers, fetchProducts, fetchCart, deleteCart, createCart } = require('./db');
const express = require('express');
const app = express();


app.get('/api/customers', async(req, res, next)=> {
    try {
      res.send(await fetchCustomers());
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
     
  app.get('/api/customers/:id/cart', async(req, res, next)=> {
    try {
      res.send(await fetchCart(req.params.id));
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
    console.log('tables created');
  
    const [jo, cathy, bow, blackSeedDounut, bodyScrub, sandlewoodCandle, honey] = await Promise.all([
      createCustomer({ username: 'jo', password: 'uxirjgb' }),
      createCustomer({ username: 'cathy', password: 'sieugbi!!' }),
      createCustomer({ username: 'bow', password: 'sfkdjhb' }),
      createProduct({ name: 'blackSeedDounut', price: 5}),
      createProduct({ name: 'bodyScrub', price: 5}),
      createProduct({ name: 'sandlewoodCandle', price: 7}),
      createProduct({ name: 'honey', price: 10}),
    ]);
    console.log("jo:", jo);
    

    console.log(jo.id);
  
    const customers = await fetchCustomers();
    console.log(customers);
    const products = await fetchProducts();
    console.log(products);
    console.log("bodyScrub:", sandlewoodCandle);
  
    const customerCarts = await Promise.all([
      createCart({ customer_id: jo.id, product_id: honey.id}),
      createCart({ customer_id: cathy.id, product_id: blackSeedDounut.id}),
      createCart({ customer_id: bow.id, product_id: sandlewoodCandle.id}),
      createCart({ customer_id: jo.id, product_id: bodyScrub.id}),
    ]);
  
    console.log(customerCarts);
  
    console.log(await fetchCart(jo.id));
  
    await deleteCart(customerCarts[1].id);
    console.log(await fetchCart(cathy.id));
  
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  
  };
  
  init();