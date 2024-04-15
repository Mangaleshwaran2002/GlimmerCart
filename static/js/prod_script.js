async function getproduct(url){
    await fetch(url).then( res =>{
        if(res.ok){
            // console.log(res.json());
            return res.json();
        }
    }).then(data => displayProd(data));
    // filterProduct("all");
}

function displayProd(data){
    // create product container
    console.log("id",data.id); 
    let product = document.createElement("div");
    product.classList.add("prod-container");
    // console.log(product);
    // create image container 
    let img_container = document.createElement("div");
    img_container.classList.add("prod-img-container");
    
    // create image tag 
    let img = document.createElement("img");
    img.src = data.image;
    img.alt = "product image";
    // console.log(img);
    // add img tag to img container 
    img_container.appendChild(img);
    // console.log(img_container);
    // add img container to product 
    product.appendChild(img_container);

    // // create product details container 
    let details_container = document.createElement("div");
    details_container.classList.add("details-container");
    
    // create title 
    let title = document.createElement("h1");
    title.classList.add("title");
    title.innerText=data.name;
    
    // // add title to the container
    details_container.appendChild(title);

    // create price 
    let price = document.createElement("h2");
    price.innerText="$"+data.price;
    price.classList.add("price");

    // add price to the container
    details_container.appendChild(price);

    // create description
    let description = document.createElement("h3");
    description.innerHTML=data.description;
    description.classList.add("description");
    
    // add description to the container
    details_container.appendChild(price);
    details_container.appendChild(description);

    //  create btn container 
    let btn_container = document.createElement("div");
    btn_container.classList.add("cart-container");

    // create btn 
    let btn = document.createElement("button");
    btn.classList.add("cart-btn");
    btn.innerHTML="Add to cart";
    // btn.setAttribute("onclick","addCart("+ data.id +")");
    link=document.createElement('a');
    link.href="/api/cart_add/"+data.id;
    // btn.appendChild(link);
    link.appendChild(btn);
    // add btn to btn_container 
    btn_container.appendChild(link);

    // add btn_container to the container
    details_container.appendChild(btn_container);

    // add container to product 
    product.appendChild(details_container);

    document.querySelector(".container").appendChild(product);

}



window.onload=()=>{
    const UrlParams= new URLSearchParams(window.location.search);
    const url=UrlParams.get("url");
    console.log(url);
    getproduct(url);
}
