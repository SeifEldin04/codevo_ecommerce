let dataContainer = [];
let loadMore = document.getElementById('loadMore');
let productSeemore = document.querySelector('.productSeemore');
let searchProducts = document.getElementById('searchProducts');
let data = JSON.parse(localStorage.getItem('cart'));

async function displayProducts() {
    let myHttps = await fetch(`https://dummyjson.com/products`);
    let myResp = await myHttps.json();

    dataContainer = myResp.products;
    console.log(dataContainer);

    for (let i = 0; i < dataContainer.length - 12; i++) {
        document.getElementById('productsData').innerHTML += createProductHTML(dataContainer[i]);
        attachEventListenersToProducts();
    }
}

function displayAllProducts() {
    for (let i = 0; i < dataContainer.length; i++) {
        document.getElementById('productsData').innerHTML += createProductHTML(dataContainer[i + 12]);

        attachEventListenersToProducts();
    }
}

loadMore.addEventListener('click', function () {
    displayAllProducts();
})

function createProductHTML(product) {
    return `<div class="col-lg-3 py-2">
    <div class="product">
        <div class="productTop">
            <img src="${product.thumbnail}" class="w-100" alt="">
            <div class="productIcon">
                <i class="fa-regular fa-heart"></i>
            </div>
        </div>
        <div class="productBottom py-2">
            <div class="d-flex justify-content-between py-3 px-4">
                <h5 class="d-none productId">${product.id}</h3>
                <h4> ${product.title} </h4>
                <div class="productSeemore">
                    <h5 class="fw-bolder">see more <i class="fa-solid fa-arrow-right"></i></h5>
                </div>
            </div>
            <div class="productDetails d-flex justify-content-between px-5 pb-2">
                <div class="price">${product.price} $</div>
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

function attachEventListenersToProducts() {
    let productElements = document.querySelectorAll('.productSeemore');
    productElements.forEach(function (productElement) {
        productElement.addEventListener('click', function () {
            let productId = this.parentNode.parentNode.querySelector('.productId').textContent;
            localStorage.setItem('id', productId);
            window.location.href = '../productDetails/details.html';
        });
    });
}

function searchProduct() {
    let searchTerm = searchProducts.value.toLowerCase();
    let filteredProducts = dataContainer.filter(function (product) {
        return product.title.toLowerCase().includes(searchTerm);
    });

    document.getElementById('productsData').innerHTML = '';

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(function (product) {
            document.getElementById('productsData').innerHTML += createProductHTML(product);
        });
    } else {
        document.getElementById('productsData').innerHTML = '<p>No products found.</p>';
    }

    attachEventListenersToProducts();
}

searchProducts.addEventListener('input', function () {
    searchProduct();
});

displayProducts();

document.getElementById('myCart').addEventListener('click', function () {
    location.href = '../myCart/myCart.html';
})

if (localStorage.getItem('cart') != null) {
    document.querySelector('#NumberProductsCart h6').classList.replace('d-none', 'd-flex');
    // $('.NumberProductsCart').fadeIn(100);
    // document.querySelector('#NumberProductsCart h6').classList.remove('d-flex');
    // document.querySelector('#NumberProductsCart h6').classList.add('d-none');
}
else {
    document.querySelector('#NumberProductsCart h6').classList.replace('d-flex', 'd-none');
    // document.querySelector('#NumberProductsCart h6').classList.add('d-none');
    // document.querySelector('#NumberProductsCart h6').classList.remove('d-flex');
    // $('.NumberProductsCart').fadeOut(100);
}

document.querySelector('#Sign').addEventListener('click', () => {
    location.href = '../login/login.html';
})











// $('#signupAndLoginPage').fadeOut(0);

// document.getElementById('Sign').addEventListener('click', function () {
//     $('#signupAndLoginPage').fadeIn(200);
// })

// document.querySelector('.closeBtn').addEventListener('click', () => {
//     $('#signupAndLoginPage').fadeOut(200);
//     clearInputs();
// })

// function clearInputs() {
//     signUpName.value = '';
//     signUpEmail.value = '';
//     signUpPassword.value = '';
//     document.getElementById('message1').innerHTML = ``;
//     document.getElementById('message2').innerHTML = ``;
// }

// document.querySelector('.mySignInBtn').addEventListener('click', () => {
//     document.querySelector('.mySignUp').classList.add('d-none')
//     document.querySelector('.mySignIn').classList.replace('d-none', 'd-block');
// })

// document.querySelector('.mySignUpBtn').addEventListener('click', () => {
//     document.querySelector('.mySignUp').classList.remove('d-none')
//     document.querySelector('.mySignIn').classList.replace('d-block', 'd-none');
// })

// start sign-up
// let signUpName = document.getElementById('signUpName');
// let signUpEmail = document.getElementById('signUpEmail');
// let signUpPassword = document.getElementById('signUpPassword');
// let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// let usersContainer = [];

// if (localStorage.getItem('users') != null) {
//     usersContainer = JSON.parse(localStorage.getItem('users'));
// }
// else {
//     usersContainer = [];
// }

// function checkDuplicationLocalStorageInSignup(email) {
//     let users = JSON.parse(localStorage.getItem('users'));

//     if (users == null) {
//         // console.log('null');
//         return true;
//     }
//     else {
//         console.log("it's not null");
//         for (let i = 0; i < users.length; i++) {
//             if (users[i].email == email) {
//                 // console.log("exist");
//                 return false;
//             }
//         }
//         return true;
//     }
// }


// function createEmail() {
//     if (signUpName.value == '' || signUpEmail.value == '' || signUpPassword.value == '') {
//         document.getElementById('message1').innerHTML = `<p class = 'text-center text-dark'>All inputs is required</p>`
//     }
//     else {
//         if (emailRegex.test(signUpEmail.value) || passwordRegex.test(signUpPassword.value)) {
//             if (checkDuplicationLocalStorageInSignup(signUpEmail.value)) {
//                 let users = {
//                     name: signUpName.value,
//                     email: signUpEmail.value,
//                     password: signUpPassword.value,
//                     active: true
//                 }
//                 usersContainer.push(users);
//                 localStorage.setItem('users', JSON.stringify(usersContainer));
//                 document.querySelector('.mySignUp').classList.add('d-none');
//                 document.querySelector('.myHome').classList.replace('d-none', 'd-block');
//                 clearInputs();
//                 $('#signupAndLoginPage').fadeOut(4000);
//             }
//             else {
//                 document.getElementById('message1').innerHTML = `<p class = 'text-center text-dark'>This email is already in use. Please use a different email.</p>`
//             }
//         }
//         else {
//             document.getElementById('message1').innerHTML = `<p class = 'text-center text-dark'>All rules of inputs is required</p>`
//         }
//     }
// }

// document.getElementById('signUp').addEventListener('click', () => {
//     createEmail();
//     document.getElementById('logBtn').addEventListener('click', function () {
//         document.querySelector('.myHome').classList.replace('d-block', 'd-none');
//         document.querySelector('.mySignIn').classList.remove('d-none');
//     })
// })

// signUpEmail.addEventListener('input', () => {
//     if (emailRegex.test(signUpEmail.value)) {
//         signUpEmail.classList.remove('is-invalid');
//         signUpEmail.classList.add('is-valid');
//     }
//     else {
//         signUpEmail.classList.add('is-invalid');
//         signUpEmail.classList.remove('is-valid');
//     }
// })

// signUpPassword.addEventListener('input', () => {
//     if (passwordRegex.test(signUpPassword.value)) {
//         signUpPassword.classList.remove('is-invalid');
//         signUpPassword.classList.add('is-valid');
//     }
//     else {
//         signUpPassword.classList.add('is-invalid');
//         signUpPassword.classList.remove('is-valid');
//     }
// })

// // start log-in
// let signInEmail = document.getElementById('signInEmail');
// let signInPassword = document.getElementById('signInPassword');

// function checkUser() {
//     if (signInEmail.value == '' || signInPassword.value == '') {
//         document.getElementById('message2').innerHTML = `<p class = 'text-center text-dark'>All inputs is required</p>`
//     }
//     else {
//         for (let i = 0; i < usersContainer.length; i++) {
//             if (signInEmail.value == usersContainer[i].email && signInPassword.value == usersContainer[i].password) {
//                 let x = usersContainer[i].name;
//                 localStorage.setItem('signInUserName', x);
//                 document.querySelector('.mySignIn').classList.add('d-none');
//                 document.querySelector('.myHome').classList.replace('d-none', 'd-block');
//                 clearInputs();
//                 $('#signupAndLoginPage').fadeOut(4000);
//             }
//             else {
//                 document.getElementById('message2').innerHTML = `<p class = 'text-center text-dark'>The email or password isn't exist</p>`
//             }
//         }
//     }
// }

// document.getElementById('SignIn').addEventListener('click', () => {
//     checkUser();
//     homeName();
// })

// function homeName() {
//     document.getElementById('userName').innerHTML = localStorage.getItem('signInUserName');

//     let users = JSON.parse(localStorage.getItem('users'));

//     document.getElementById('logBtn').addEventListener('click', function () {
//         for (let i = 0; i < users.length; i++) {
//             if (users[i].active == true) {
//                 users[i].active == false;
//                 console.log('already logged out');
//             }
//         }
//         localStorage.removeItem('signInUserName');
//         document.querySelector('.myHome').classList.replace('d-block', 'd-none');
//         document.querySelector('.mySignIn').classList.remove('d-none');
//     })
// }



// let id = localStorage.getItem('id');
// async function displaysp() {
//     let featured = await fetch(`https://dummyjson.com/products/${id}`);
//     let finalFeatured = await featured.json();
//     let selectedProduct = document.querySelector('.selected-product');

//     selectedProduct.innerHTML += `
//       <div class="col-lg-4 image-container">
//         <img src="${finalFeatured.thumbnail}" class="w-100 mainImage">
//         <div class="row my-2 sm-sp-img">
//           <div class="col-3">
//             <img src="${finalFeatured.thumbnail}" class="w-100 sm-image">
//           </div>
//           <div class="col-3">
//             <img src="${finalFeatured.images[0]}" class="w-100 sm-image">
//           </div>
//           <div class="col-3">
//             <img src="${finalFeatured.images[1]}" class="w-100 sm-image">
//           </div>
//           <div class="col-3">
//             <img src="${finalFeatured.images[2]}" class="w-100 sm-image">
//           </div>
//         </div>
//       </div>
//       <div class="col-lg-8">
//         <div class="product-details d-flex justify-content-center flex-column px-lg-5">
//           <span class="sp-category">smartphones</span>
//           <h2 class="sp-brand-title fs-1">${finalFeatured.brand} ${finalFeatured.title}</h2>
//           <h3 class="sp-price fs-2">$${finalFeatured.price}</h3>
//           <div>

//           </div>
//           <p class="sp-desc">
//             <h3>product details:</h3>
//             <p class="text-muted">${finalFeatured.description}</p>
//           </p>
//           <button class="btn mx-1 sp-btn text-capitalize addToCart">add to cart</button>
//         </div>
//       </div>
//     `;

//     let mainImage = document.querySelector('.mainImage');
//     let myImages = Array.from(document.querySelectorAll('.sm-image'));

//     myImages.forEach(function (image) {
//         image.addEventListener('click', function (e) {
//             let nextImgSrc = e.target.getAttribute('src');
//             mainImage.setAttribute('src', nextImgSrc);
//         });
//     });
//     let addToCart = document.querySelector('.addToCart');
//     addToCart.addEventListener('click', function () {
//         let existingCart = localStorage.getItem('cart');
//         let cartItems = existingCart ? JSON.parse(existingCart) : [];
//         let productId = finalFeatured.id;

//         if (!cartItems.includes(productId)) {
//             cartItems.push(productId);
//             localStorage.setItem('cart', JSON.stringify(cartItems));
//         }
//     });
// }
// displaysp()




// let data = JSON.parse(localStorage.getItem('cart'));
// async function displayCart() {
//     let cart = document.querySelector('.cart');
//     cart.innerHTML = '';

//     for (let i = 0; i < data.length; i++) {
//         let featured = await fetch(`https://dummyjson.com/products/${data[i]}`);
//         let finalFeatured = await featured.json();

//         cart.innerHTML += `


//             <tr> 
//               <td><img src="${finalFeatured.thumbnail}" alt="" class="cart-img"></td>
//               <td>${finalFeatured.title}</td>
//               <td class='price'>${finalFeatured.price}$</td>
//               <td>
//                 <input type="number" min="1" value="1" max="10" class="py-1 px-2 text-center sp-qu quantity" data-index="${i}">
//               </td>
//               <td class="subTotal">${finalFeatured.price}$</td>
//               <td class="text-uppercase delete" data-index="${i}">
//                 <i class="fa-solid fa-trash" style="color: red;"></i>
//               </td>
//             </tr>

//         </table>
//       `;
//     }

//     let deleteProd = document.querySelectorAll('.delete');
//     deleteProd.forEach((item) => {
//         item.addEventListener('click', function () {
//             let index = item.getAttribute('data-index');
//             deleteCart(index);
//         });
//     });

//     let subTotal = document.querySelectorAll('.subTotal');
//     let quantity = document.querySelectorAll('.quantity');
//     let prices = document.querySelectorAll('.price');

//     quantity.forEach((qProduct, index) => {
//         qProduct.addEventListener('input', function () {
//             let price = parseFloat(prices[index].textContent.replace('$', ''));
//             let subtotal = price * parseInt(qProduct.value);
//             subTotal[index].textContent = subtotal + '$';
//         });
//     });
// }

// displayCart();

{/* <h5 class="fw-bolder p-3 rounded-4 bg-black">Add to cart</h5> */ }
