let dataContainer = [];
let data = JSON.parse(localStorage.getItem('cart'));

async function displayProductDetails() {
    let id = localStorage.getItem('id');
    let myHttps = await fetch(`https://dummyjson.com/products/${id}`);
    let myResp = await myHttps.json();

    dataContainer = myResp;

    console.log(dataContainer);

    let productDetails = document.getElementById('productDetails');

    productDetails.innerHTML += `               
    <div class="col-lg-6">
        <div class="imagesContent">
            <img src="${dataContainer.thumbnail}" id="mainImage" class="w-75" alt="">

            <div class="row py-4">
                <div class="col-md-3">
                    <img src="${dataContainer.images[0]}" class="sm-image imageItem" alt="">
                </div>
                <div class="col-md-3">
                    <img src="${dataContainer.images[1]}" class="sm-image imageItem" alt="">
                </div>
                <div class="col-md-3">
                    <img src="${dataContainer.images[2]}" class="sm-image imageItem" alt="">
                </div>
                <div class="col-md-3">
                    <img src="${dataContainer.images[3]}" class="sm-image imageItem" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-6 mt-5">
        <div class="detailsContent">
            <h1 class="py-5">${dataContainer.title}</h1>
            <h2>description : ${dataContainer.description}</h2>
            <h3>price : ${dataContainer.price} $  =>  ${dataContainer.discountPercentage} $</h3>
            <h3>stock : ${dataContainer.stock}</h3>
            <h3>brand : ${dataContainer.brand}</h3>
            <h3>category : ${dataContainer.category}</h3>
            <button class="btn btn-warning w-75 py-3 px-5 mt-4 sp-btn text-capitalize addToCart">add to cart</button>
        </div>
    </div>`

    $('.imageItem').click(function (e) {
        let imgSrc = $(e.target).attr('src');
        $('#mainImage').attr('src', imgSrc);
    })

    // localStorage.removeItem('id');


    let addToCart = document.querySelector('.addToCart');
    console.log(addToCart);
    if (isUserSignedUpAndActive)
        addToCart.addEventListener('click', function () {
            let existingCart = localStorage.getItem('cart');
            let cartItems = existingCart ? JSON.parse(existingCart) : [];
            let productId = dataContainer.id;

            if (!cartItems.includes(productId)) {
                cartItems.push(productId);
                localStorage.setItem('cart', JSON.stringify(cartItems));
            }
        });

    if (localStorage.getItem('cart') != []) {
        document.querySelector('#NumberProductsCart h6').classList.replace('d-none', 'd-flex');
    }
    else {
        // document.querySelector('#NumberProductsCart h6').classList.replace('d-flex' , 'd-none');
        document.querySelector('#NumberProductsCart h6').classList.add('d-none');
        document.querySelector('#NumberProductsCart h6').classList.remove('d-flex');
    }

    console.log(data);
}

displayProductDetails();

document.getElementById('myCart').addEventListener('click', function () {
    location.href = '../myCart/myCart.html';
})

document.querySelector('#sign').addEventListener('click', () => {
    location.href = '../login/login.html';
})

function isUserSignedUpAndActive() {
    let users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    let signInUserName = localStorage.getItem('signInUserName');
    console.log(signInUserName);

    if (users && signInUserName) {
        let user = users.find(user => user.name === signInUserName);
        if (user && user.active) {
            return true;
        }
    }
    return false;
}

function addToCart() {
    if (isUserSignedUpAndActive()) {
        // Implement your logic to add the product to the cart
        // This can include updating the cart count, storing the product details, etc.
    } else {
        // Prompt the user to sign up or log in
        // You can show a modal or redirect them to the sign-up/login page
    }
}
isUserSignedUpAndActive()