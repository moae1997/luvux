const pg = require('pg');
const client = new pg.Client('postgres://localhost/luvux_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const createTables = async()=> {
    const SQL = `
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS customers;
      DROP TABLE IF EXISTS products;
      CREATE TABLE customers(
        id UUID PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255)
      );
      CREATE TABLE products(
        id UUID PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        price INTEGER NOT NULL
      );
      CREATE TABLE carts(
        id UUID PRIMARY KEY,
        product_id UUID REFERENCES products(id) NOT NULL,
        customer_id UUID REFERENCES customers(id) NOT NULL,
        CONSTRAINT unique_product_customer UNIQUE (product_id, customer_id)
      );
    `;
    await client.query(SQL);
  };

  const createCustomer = async({ username, password })=> {
    const SQL = `
      INSERT INTO customers(id, username, password) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password, 5)]);
    return response.rows[0];
  }
  
  const createProduct = async({ name, price })=> {
    const SQL = `
      INSERT INTO products(id, name, price) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name, price]);
    return response.rows[0];
  }

  const createCart = async({ customer_id, product_id })=> {
    const SQL = `
      INSERT INTO carts(id, customer_id, product_id) VALUES($1, $2, $3) RETURNING *
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
  
  const fetchProducts = async()=> {
    const SQL = `
      SELECT * FROM products;
    `;
    const response = await client.query(SQL);
    return response.rows;
  }
  
  const fetchCart = async(id)=> {
    const SQL = `
      SELECT * FROM carts
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
    deleteCart
  };