// variables setup

const cartBtn=document.querySelector('.cart-btn');
const closeCartBtn=document.querySelector('.close-cart')
const clearCartBtn=document.querySelector('.clear-cart')
const cartDOM=document.querySelector('.cart')
const cartOverlay=document.querySelector('.cart-overlay')
const cartItems=document.querySelector('.cart-items')
const cartTotal=document.querySelector('.cart-total')
const cartContent=document.querySelector('.cart-content')
const productsDom=document.querySelector('.products-center')


// cart
let cart=[];

// getting the products
class Products{
   async getProducts(){
      try {
        let result= await fetch('products.json')
        let data=await result.json()
        //return data 
        let products=data.items
        products=products.map((item)=>{
         const{title,price}=item.fields;
         const{id}=item.sys
         const image=item.fields.image.fields.file.url
        
         return{title,price,id,image}
        })
        return products
      } catch (error) {
        console.log(error);
      }
     }
}

// display products
class UI{
   displayProducts(products){
      let result=''
      products.forEach((product)=>{
         result+=`
         <article class="product">
         <div class="img-container">
            <img src=${product.image} alt="img not found" class="product-img">
            <button class="bag-btn" data-id=${product.id}>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
               add to bag
            </button>
         </div>
            <h3>${product.title}</h3>
            <h4>${product.price}</h4>
      
      </article>
         
         `
      })
      productsDom.innerHTML=result;
   }
   getBagButton(){
      const buttons=[...document.querySelectorAll('.bag-btn')]
     buttons.forEach((button)=>{
     let id=button.dataset.id
     console.log(id);
     })
   }
}

//local storage

class Storage{
  static saveProducts(products){
   localStorage.setItem("products",JSON.stringify(products)
   );
 
  }
}

document.addEventListener("DOMContentLoaded",()=>{  
   const ui=new UI();
   const products=new Products()
   // get products
   products.getProducts().then(products=>{ui.displayProducts(products)
   Storage.saveProducts(products)
   }).then(()=>{
      ui.getBagButton()
   });
});


//---- note:The DOMContentLoaded event is a useful event that can make a big impact on the performance of your pages, hence this example. It fires when the HTML and scripts that make up the page have loaded, but not necessarily the images or CSS .----//