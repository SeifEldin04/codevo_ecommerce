let dataContainer = [];

let data = JSON.parse(localStorage.getItem('cart'));
console.log(data);

async function displayCartProducts() {

    let cartDetails = document.getElementById('cartDetails');

    cartDetails.innerHTML = ``;

    for (let i = 0; i < data.length; i++) {
        let myHttps = await fetch(`https://dummyjson.com/products/${data[i]}`);
        let myResp = await myHttps.json();

        dataContainer = myResp;

        //     cartDetails.innerHTML = `                    <tr>
        //     <td> <div class="w-25 mx-auto"> <img src="${dataContainer.thumbnail}" class="w-75" alt=""> </div> </td>
        //     <td> ${dataContainer.title} </td>
        //     <td> ${dataContainer.price}$ </td>
        //     <td> ${dataContainer.brand} </td>
        // </tr>`

        cartDetails.innerHTML += `<div class="productCart">
    <div class="row">
        <div class="col-md-3">
            <div class="imageCart">
                <img src="${dataContainer.thumbnail}" class="constHeight" alt="">
            </div>
        </div>

        <div class="col-md-6 text-center">
            <div class="detailsCart">
                <h3>${dataContainer.title}</h3>
                <h4>Price : ${dataContainer.price}$</h4>
                <h4>Discount Percentage : ${dataContainer.discountPercentage}%</h4>
                <h4>Brand : ${dataContainer.brand}</h4>
            </div>
        </div>

        <div class="col-md-3">
            <div class="btnsCart">
                <button class="btnDelete btn btn-danger data-index="${i}"">Delete <i
                        class="fa-solid fa-trash-alt"></i></button>
            </div>
        </div>
    </div>
</div>`
    }
    if (localStorage.getItem('cart') != []) {
        document.querySelector('#NumberProductsCart h6').classList.replace('d-none', 'd-flex');
    }
    else {
        document.querySelector('#NumberProductsCart h6').classList.add('d-none');
        document.querySelector('#NumberProductsCart h6').classList.remove('d-flex');
    }

    let deleteButtons = document.getElementsByClassName('btnDelete');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            let index = this.getAttribute('data-index');
            removeProduct(index);
        });
    }
}

function removeProduct(index) {
    data.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(data));
    displayCartProducts();
}

displayCartProducts();


// let deleteProd = document.querySelectorAll('.btnDelete');
// deleteProd.forEach((item) => {
//     item.addEventListener('click', function () {
//         let index = item.getAttribute('data-index');
//         deleteProduct(index);
//     });
// });


// function deleteProduct(element) {
//     dataContainer.splice(element, 1);
//     // localStorage.setItem('myProducts', JSON.stringify(productContainer));
//     displayCartProducts();
// }

// function to remove a product from cart


// add event listeners to all delete buttons


document.querySelector('#NumberProductsCart h6').classList.remove('d-none');
document.querySelector('#NumberProductsCart h6').classList.add('d-flex');

document.querySelector('#NumberProductsCart h6').classList.add('d-none');
document.querySelector('#NumberProductsCart h6').classList.remove('d-flex');

document.querySelector('#sign').addEventListener('click', () => {
    location.href = '../login/login.html';
})