const pg = require('pg');
const client = new pg.Client('postgres://localhost/luvux_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT || "fmyumchsymxgnbfgtmugfnym";
console.log(SECRET);

const createTables = async()=> {
    const SQL = `
      DROP TABLE IF EXISTS cartHistory;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS customers;
      DROP TABLE IF EXISTS products;
      CREATE TABLE customers(
        id UUID PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_Admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
      CREATE TABLE products(
        id UUID PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price INTEGER NOT NULL,
        iamgeURL VARCHAR(255),
        fruit BOOLEAN DEFAULT false,
        animal_product BOOLEAN DEFAULT false,
        home_made BOOLEAN DEFAULT false
      );
      CREATE TABLE carts(
        id UUID PRIMARY KEY,
        product_id UUID REFERENCES products(id) NOT NULL,
        customer_id UUID REFERENCES customers(id) NOT NULL,
        how_many INTEGER DEFAULT 1,
        CONSTRAINT unique_product_customer UNIQUE (product_id, customer_id)
      );
      CREATE TABLE cartHistory(
        id UUID PRIMARY KEY,
        product_id UUID REFERENCES products(id) NOT NULL,
        customer_id UUID REFERENCES customers(id) NOT NULL,
        last_purchased TIMESTAMP DEFAULT now()
      );
    `;
    await client.query(SQL);
  };

  const createCustomer = async({ email, password, name, is_Admin })=> {
    const SQL = `
      INSERT INTO customers(id, name, email, password, is_Admin) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name, email, await bcrypt.hash(password, 5), is_Admin]);
    return response.rows[0];
  }
  
  const createProduct = async({ name, price, iamgeURL, fruit, animal_product, home_made })=> {
    const SQL = `
      INSERT INTO products(id, name, price, iamgeURL, fruit, animal_product, home_made) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name, price, iamgeURL, fruit, animal_product, home_made]);
    return response.rows[0];
  }

  const createCart = async({ customer_id, product_id })=> {
    const SQL = `
      INSERT INTO carts(id, customer_id, product_id) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), customer_id, product_id]);
    return response.rows[0];
  }

  const createCartHistory = async({ customer_id, product_id })=> {
    const SQL = `
      INSERT INTO cartHistory(id, customer_id, product_id) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), customer_id, product_id]);
    return response.rows[0];
  }
  
  const fetchCustomers = async()=> {
    const SQL = `
      SELECT * FROM customers;
    `;
    const response = await client.query(SQL);
    return response.rows;
  }

  const fetchCustomer = async(id) => {
    const SQL = `
      SELECT * FROM customers
      WHERE id = $1
    `;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
  }

  const fetchCustomerEmail = async(email) => {
    const SQL = `
      SELECT * FROM customers
      WHERE email = $1
    `;
    const response = await client.query(SQL, [email]);
    return response.rows[0];
  }
  
  const fetchProducts = async()=> {
    const SQL = `
      SELECT * FROM products;
    `;
    const response = await client.query(SQL);
    return response.rows;
  }

  const fetchProduct = async(id) => {
    const SQL = `
      SELECT * FROM products
      WHERE id = $1
    `;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
  }
  
  const fetchCart = async(id)=> {
    const SQL = `
      SELECT * FROM carts
      WHERE customer_id = $1
    `;
    const response = await client.query(SQL, [ id ]);
    return response.rows;
  }

  const UpdateCart = async({cart_id, number})=> {
    const SQL = `
    UPDATE carts
    SET how_many= $1
    WHERE id = $2 
    RETURNING *;
    `;
    const response = await client.query(SQL, [ number, cart_id ]);
    return response.rows[0];
  }

  const fetchCartHistory = async(id)=> {
    const SQL = `
      SELECT * FROM cartHistory
      WHERE customer_id = $1
    `;
    const response = await client.query(SQL, [ id ]);
    return response.rows;
  }

  const deleteCart = async({id, customer_id})=> {
    const SQL = `
      DELETE FROM carts
      WHERE id = $1 AND customer_id = $2
    `;
    await client.query(SQL, [ id, customer_id ]);
  }


 
  module.exports = {
    client,
    createTables,
    createCustomer,
    createProduct,
    createCart,
    fetchCustomers,
    fetchProducts,
    fetchCart,
    deleteCart,
    fetchProduct,
    fetchCustomer,
    createCartHistory,
    fetchCartHistory,
    fetchCustomerEmail,
    UpdateCart
  };