const apiUrl = window.location+"/api/products/";
const categoryUrl = window.location+"/api/category/";
async function fetchData(){
    await fetch(apiUrl).then( res =>{
        if(res.ok){
          console.log(res);
          return res.json();
        }
    }).then(data => displayData(data))
    .catch(err =>{console.error(err);});
    filterProduct("all");
    
}

async function fetchCat(){
  await fetch(categoryUrl).then( res =>{
      if(res.ok){
        console.log(res);
        return res.json();
      }
  }).then(data => displayCat(data))
  .catch(err =>{console.error(err);});
  // filterProduct("all");
  
}

// let category= [
//     "all",
//     "men\'s clothing",
//     "jewelery",
//     "electronics",
//     "women\'s clothing",
//   ];
  
function displayCat(category){  
for ( j of category){
    let btn = document.createElement("button");
    btn.classList.add("button-value");
    btn.setAttribute("onclick",'filterProduct("'+j.name.replace(" ","-")+'")');
    btn.innerText = j.name.toUpperCase();
    document.querySelector("#buttons").appendChild(btn);
}

}


function displayData(products){
  
    for(let i of products){
        // create card
        // console.log(i.category.name);
        let category= i.category.name.replace(" ","-");
        let link= document.createElement("a");
        link.classList.add("link","hide",category)
        link.href="product/?url="+i.url;
        console.log("location "+window.location);
        let card = document.createElement("div");
        // // card should have category and should stay hidden initially
        // console.log(category);
        card.classList.add("card");
        // console.log(card);
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        let image= document.createElement("img");
        image.setAttribute("src",i.image);
        image.classList.add("img-tag");
        image.setAttribute("alt","product image is here");
        imageContainer.appendChild(image);
        card.appendChild(imageContainer);
        
        // console.log(image);
        let container = document.createElement("div");
        // create a container 
        container.classList.add("container");
        // create title 
        let name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = i.name.substring(0,25)+"...";
        // add title to container 
        container.appendChild(name);
        // create price 
        let price = document.createElement("h6");
        price.classList.add("product-price");
        price.innerText = "$"+i.price;
        // add price to container 
        container.appendChild(price);
        // add container to card 
        card.appendChild(container);
        link.appendChild(card);
        document.querySelector("#products").appendChild(link);
      }
}

function filterProduct(value){
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach(button =>{
      if(value.toUpperCase() == button.innerText){
        button.classList.add("active");
      }
      else{
        button.classList.remove("active");
      }
    });
  
    let elements = document.querySelectorAll(".link");
    elements.forEach(element =>{
      // display all cards 
      if( value == 'all'){
        element.classList.remove('hide');
      }
      else{
        if(element.classList.contains(value)){
          element.classList.remove('hide');
        }
        else{
          element.classList.add('hide');
        }
      }
    });
  }

window.onload = () =>{
  fetch(apiUrl).then(res =>{
    if(res.ok){
      console.log(res.json());
    }
  });
  fetchData();
  fetchCat();
}
