const { client, createTables, createCustomer, createProduct, fetchCustomers, fetchProducts, fetchCart, deleteCart, createCart, fetchCustomer, fetchProduct, createCartHistory, fetchCartHistory, fetchCustomerEmail, UpdateCart } = require('./db');
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

  app.patch('/api/cart/:id', async(req, res, next)=>{
        try {
            res.status(201).send(await UpdateCart({cart_id: req.params.id, number: req.body.number}));
        } catch(ex){
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
      createProduct({ name: 'black_seed_dounut', price: 5, iamgeURL: "https://cdn.pixabay.com/photo/2020/05/21/12/43/donut-5200618_1280.png", home_made: true}),
      createProduct({ name: 'body_scrub', price: 12, iamgeURL: "https://cdn.pixabay.com/photo/2014/11/27/20/52/scrub-548198_1280.jpg", home_made: true}),
      createProduct({ name: 'sandalewood_candle', price: 49, iamgeURL: "https://cdn.pixabay.com/photo/2015/11/03/16/59/candle-1021137_1280.jpg", home_made: true}),
      createProduct({ name: 'soap', price: 6, iamgeURL: "https://cdn.pixabay.com/photo/2017/09/07/19/43/soap-2726387_1280.jpg", home_made: true}),
      createProduct({ name: 'moitureizer', price: 18, iamgeURL: "https://cdn.pixabay.com/photo/2018/02/09/15/42/glass-3141865_1280.jpg", home_made: true}),
      createProduct({ name: 'honey', price: 10, iamgeURL: "https://cdn.pixabay.com/photo/2015/10/26/11/10/honey-1006972_1280.jpg", animal_product: true}),
      createProduct({ name: 'goat_cheese', price: 7, iamgeURL: "https://cdn.pixabay.com/photo/2018/06/08/23/30/cheese-3463368_1280.jpg", animal_product: true}),
      createProduct({ name: 'raw_milk', price: 7, iamgeURL: "https://cdn.pixabay.com/photo/2024/03/26/00/33/ai-generated-8655656_1280.jpg", animal_product: true}),
      createProduct({ name: 'eggs', price: 3, iamgeURL: "https://cdn.pixabay.com/photo/2018/03/11/18/34/brown-eggs-3217675_1280.jpg", animal_product: true}),
      createProduct({ name: 'meat', price: 7, iamgeURL: "https://cdn.pixabay.com/photo/2016/11/10/16/29/beef-1814638_1280.png", animal_product: true}),
      createProduct({ name: 'watermelon', price: 9, iamgeURL: "https://cdn.pixabay.com/photo/2014/11/30/07/16/watermelon-551235_1280.jpg", fruit: true}),
      createProduct({ name: 'strawberries', price: 4, iamgeURL: "https://cdn.pixabay.com/photo/2022/07/15/20/13/strawberries-7323943_1280.jpg", fruit: true}),
      createProduct({ name: 'golden_apples', price: 15, iamgeURL: "https://cdn.pixabay.com/photo/2021/12/07/02/10/apple-6851898_1280.jpg", fruit: true}),
      createProduct({ name: 'pears', price: 11, iamgeURL: "https://cdn.pixabay.com/photo/2015/09/22/18/05/pair-952187_1280.jpg", fruit: true}),
      createProduct({ name: 'peaches', price: 13, iamgeURL: "https://cdn.pixabay.com/photo/2018/07/10/22/08/peaches-3529802_1280.jpg", fruit: true}),
      createProduct({ name: 'blueberries', price: 6, iamgeURL: "https://cdn.pixabay.com/photo/2023/04/11/16/13/agriculture-7917686_1280.jpg", fruit: true}),
      createProduct({ name: 'figs', price: 10, iamgeURL: "https://cdn.pixabay.com/photo/2015/09/07/22/37/fig-929268_1280.jpg", fruit: true}),
      createProduct({ name: 'lemon', price: 2, iamgeURL: "https://cdn.pixabay.com/photo/2016/11/21/16/40/agriculture-1846358_1280.jpg", fruit: true}),
      createProduct({ name: 'cherries', price: 20, iamgeURL: "https://cdn.pixabay.com/photo/2022/12/13/18/00/autumn-7653897_1280.jpg", fruit: true}),
      createProduct({ name: 'oranges', price: 5, iamgeURL: "https://cdn.pixabay.com/photo/2019/10/21/14/54/oranges-4566275_1280.jpg", fruit: true})
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