const apiUrl="http://127.0.0.1:8000/api/cart/";
async function getCart(){
    await fetch(apiUrl).then(res =>{
        if(res.ok){
            return res.json();
        }
    }).then(data => dispCart(data)).catch(err =>{
        console.log("error :"+err)
    })
}

function dispCart(datas){
    let total_price=0;
    for( data of datas ){
        console.log(data);
        let product = document.createElement("div");
        product.classList.add("product");
        let prod_img = document.createElement("div");
        prod_img.classList.add("prod-img");
        let image = document.createElement("img")
        image.src=data.product_id.image;
        image.alt="product image";
        prod_img.appendChild(image);
        product.appendChild(prod_img);
        // console.log(product);
        let prod_desc = document.createElement("div");
        prod_desc.classList.add("prod-desc");
        let title = document.createElement("h1");
        title.innerText = data.product_id.name;
        prod_desc.appendChild(title);

        let price_desc = document.createElement("div");
        price_desc.classList.add("price-desc");
        let price = document.createElement("h3");
        price.innerText="Price: $"+data.product_id.price;
        price_desc.appendChild(price);

        let qty_btn = document.createElement("span");
        qty_btn.classList.add("qty-btn");

        let minus =document.createElement("a");
        minus.href="/api/cart_dec/"+data.product_id.id;
        let minus_btn = document.createElement("button");
        minus_btn.innerHTML="-";
        minus.appendChild(minus_btn);
        qty_btn.appendChild(minus);

        let qty = document.createElement("h3");
        qty.innerText="Qty:"+data.quantity;
        qty_btn.appendChild(qty);

        let plus =document.createElement("a");
        plus.href="/api/cart_add/"+data.product_id.id;
        let plus_btn = document.createElement("button");
        plus_btn.innerHTML="+";
        plus.appendChild(plus_btn);
        qty_btn.appendChild(plus);

        price_desc.appendChild(qty_btn);
        console.log(price_desc);
        let price_tot = document.createElement("h2");
        price_tot.innerText="Total: "+(data.product_id.price * data.quantity);
        total_price +=(data.product_id.price * data.quantity);
        price_desc.appendChild(price_tot);
        prod_desc.appendChild(price_desc);
        product.appendChild(prod_desc);
        document.querySelector(".container").appendChild(product);
        // console.log("product_name :"+data.product_id.name);
        // console.log("product_price :"+data.product_id.price);
        // console.log("quantity:"+data.quantity);
        // console.log("total:"+data.product_id.price * data.quantity);
    }
    let total = document.createElement("div");
    total.classList.add("total");
    total_h2 = document.createElement("h2");
    total_h2.innerText = "Total: "+total_price;
    total.appendChild(total_h2);
    document.querySelector(".container").appendChild(total);

}


window.onload = () =>{
    getCart();
}