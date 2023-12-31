$(document).ready(function() {

    $('.tab').click(function() {
    // remove active class from all tabs
        $('.tab').removeClass('active');
        
        // add active class to the clicked tab
        $(this).addClass('active');
        
        // hide all tab content panes
        $('.tab-pane').removeClass('active');
        
        // show the content pane for the clicked tab
        $('.tab-pane[data-tab="' + $(this).data('tab') + '"]').addClass('active');
    });

    new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 3000
        },
        
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
      
        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    var products = document.querySelectorAll('#showProducts');

    var cartItems = [];
    var totalPrice = 0;

    // Loop through the products and add them to the cart
    for (var i = 0; i < products.length; i++) {
        var prijsFiets = products[i].querySelectorAll('#totalPrice');
        var naamFiets = products[i].querySelectorAll('#title');
        var quantityFiets = products[i].querySelectorAll('#quantity');
        var ProductID = products[i].querySelectorAll('#product_id');

        var itemPrice = parseFloat(prijsFiets[0].textContent);
        var itemQuantity = parseInt(quantityFiets[0].value);
        var itemProductID = parseInt(ProductID[0].value);
        cartItems.push({ id: itemProductID, name: naamFiets[0].textContent, quantity: itemQuantity, price: itemPrice });

        totalPrice += itemPrice * itemQuantity;
    }

    // Update the total price display
    var updateTotalPrice = totalPrice.toFixed(2);
    var totalEl = document.getElementById('TotalAlleProducten');
    totalEl.textContent = updateTotalPrice;

    var verzendBedrag = 29.50;
    var bedragPlusVerzend = parseFloat(updateTotalPrice) + verzendBedrag;

    var winkelmandElement = document.getElementById('TotalWinkelmand');
    winkelmandElement.textContent = bedragPlusVerzend.toFixed(2);

    // Define an event listener function for quantity changes
    function updateCart(event) {
        var index = parseInt(event.target.dataset.index);
        var quantity = parseInt(event.target.value);

        cartItems[index].quantity = quantity;

        // Recalculate the total price
        var newTotalPrice = 0;
        for (var i = 0; i < cartItems.length; i++) {
            newTotalPrice += cartItems[i].quantity * cartItems[i].price;
        }
        var newbedragPlusVerzend = parseFloat(newTotalPrice) + verzendBedrag;

        // Update the total price display
        totalEl.textContent = newTotalPrice.toFixed(2);
        winkelmandElement.textContent = newbedragPlusVerzend.toFixed(2);

        // Call the updateWinkelwagenData function for the current item
        updateWinkelwagenData(index);
    }

    function updateWinkelwagenData(i) {
        var quantity = cartItems[i].quantity;
        var productId = cartItems[i].id;
    
        // Send an AJAX request to update the product quantity
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'wijzig-winkelwagen');
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        var data = {
            productId: productId,
            quantity: quantity
        };
    
        xhr.send(JSON.stringify(data));
    }

    // Loop through the products again and add event listeners to their quantity input elements
    for (var i = 0; i < products.length; i++) {
        var quantityFiets = products[i].querySelectorAll('#quantity');

        quantityFiets[0].addEventListener('change', updateCart);
        quantityFiets[0].dataset.index = i;
    }

    var formattedTotal = totalPrice.toFixed(2);
    var totalElement = document.getElementById('TotalAlleProducten');
    totalElement.innerHTML = formattedTotal;

    var bedragPlusVerzend = parseFloat(formattedTotal) + 29.50;

    var verzendElement = document.getElementById('verzendkosten');
    verzendElement.innerHTML = verzendBedrag.toFixed(2);

    var winkelmandElement = document.getElementById('TotalWinkelmand');
    winkelmandElement.innerHTML = bedragPlusVerzend.toFixed(2);

    var naarBetaalMethode = document.getElementById("winkelwagen-betaal-btn");
    naarBetaalMethode.setAttribute("href", "betalings-methode?totaalbedrag=" + bedragPlusVerzend.toFixed(2));

    var updateWinkelwagen = document.getElementById('updateWinkelwagen');
    updateWinkelwagen.addEventListener('click', updateWinkelwagenData);    
});
