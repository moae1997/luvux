import react from "react";


const pathforapi = "http://localhost:3000/api/";


export async function FetchProducts() {
    try {
        const response = await fetch(
          pathforapi + "products"
        ); 
        const result = await response.json(); 
        return result;
      } catch (error) {
        return error;
      }
}


export async function Register(registerInfo) {

    try { 
        const response = await fetch(pathforapi + 'register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo)
      });
      const result = await response.json();
       return result;
    } catch (error) {
            return error;
          }
}

export async function Login(loginInfo) {
    
    try {
      const response = await fetch(pathforapi + "login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(loginInfo)
    });
      const result = await response.json();
      return result;
    } catch (error) {
          return error;
        }
  

}

export async function History(customerID) {
    try {
        const response = await fetch(pathforapi + `customers/${customerID}/cartHistory`, {
        headers: { 
          "Content-Type": "application/json",
        }
      });
        const result = await response.json();
        return result;
      } catch (error) {
            return error;
          }
}

export async function GetCart(customerID) {
    try {
        const response = await fetch(pathforapi + `customers/${customerID}/cart`, {
        headers: { 
          "Content-Type": "application/json",
        }
      });
        const result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
            return error;
          }
}

export async function MakeCart(customerID, user) {
    try {
        const response = await fetch(pathforapi + `customers/${customerID}/cart`, {
        method: "POST",    
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({product_id: user})
      });
        const result = await response.json();
        return result;
      } catch (error) {
            return error;
          }
}

export async function FetchProduct(productID) {
    try {
        const response = await fetch(
          pathforapi + `product/${productID}`
        ); 
        const result = await response.json(); 
        return result;
      } catch (error) {
        return error;
      }
}