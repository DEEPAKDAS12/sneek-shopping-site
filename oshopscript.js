// Function to toggle display of menu options
function toggleMenu() {
    var menuOptions = document.getElementById("menu-options");
    menuOptions.style.display = (menuOptions.style.display === "block") ? "none" : "block";
}

// Function to display user info
function displayUserInfo() {
    var name = localStorage.getItem("signupName");
    if (name) {
        document.getElementById("user-info").textContent = "Hello, " + name;
    }
}

// Function to confirm exit
function confirmExit() {
    var confirmExit = confirm("Are you sure you want to exit?");
    if (confirmExit) {
        window.close();
    }
}

// Function to sign out
function signOut() {
    localStorage.removeItem("signupName");
    location.reload(); // Refresh the page to go back to sign up
}

// Call displayUserInfo on page load
window.addEventListener("load", displayUserInfo);



// Global variables
var currentUser;
var cart = [];

// Function to show sign-up form and hide login form
function showSignUp() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

// Function to show login form and hide sign-up form
function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

// Function to handle sign-up form submission
document.getElementById("signup").addEventListener("submit", function(event) {
    event.preventDefault();
    // Collect signup data
    var name = document.getElementById("name").value;
    var mobile = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // Validation checks
    var nameRegex = /^[A-Z][a-zA-Z\s]*$/;
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    var mobileRegex = /^\d{10}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var errors = [];
    if (!nameRegex.test(name)) {
        errors.push("Name should start with a capital letter and contain only letters and spaces.");
    }
    if (!passwordRegex.test(password)) {
        errors.push("Password should be at least 8 characters long and contain at least one special character and one number.");
    }
    if (!mobileRegex.test(mobile)) {
        errors.push("Mobile number should be exactly 10 digits long and contain only numbers.");
    }
    if (!emailRegex.test(email)) {
        errors.push("Invalid email format.");
    }
    if (!/^[A-Z]/.test(username)) {
        errors.push("Username should start with a capital letter.");
    }
    
    // Display error messages or proceed with signup
    if (errors.length > 0) {
        // Clear previous error messages
        document.getElementById("signup-error-container").innerHTML = "";
        // Display error messages outside the form
        var errorContainer = document.getElementById("signup-error-container");
        errors.forEach(function(error) {
            var errorMessage = document.createElement("p");
            errorMessage.textContent = error;
            errorContainer.appendChild(errorMessage);
        });
    } else {
        // Hide error messages if there are no errors
        document.getElementById("signup-error-container").innerHTML = "";
        // Store the user
        currentUser = {
            username: username,
            password: password
        };
        // Hide signup form, show login form
        showLogin();
    }
});

// Function to handle login form submission
document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();
    // Collect login data
    var loginUsername = document.getElementById("login-username").value;
    var loginPassword = document.getElementById("login-password").value;
    // Check if entered username and password match the stored signup data
    if (currentUser && loginUsername === currentUser.username && loginPassword === currentUser.password) {
        // Redirect to products page after successful login
        showProducts();
    } else {
        // Display error message for incorrect login
        document.getElementById("login-error").innerHTML = "Invalid username or password.";
    }
});

// Function to display products page
function showProducts() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("products").style.display = "block";
    displayProducts();
}

// Sample products data with images
var products = [
    { name: "Electric Stove", price: 100, image: "C:/Users/macha/OneDrive/WAD/.vscode/elecstove.jpg" },
    { name: "Robotic Vaccum Cleaner", price: 120, image: "C:/Users/macha/OneDrive/WAD/.vscode/vaccl.jpg" },

    {name:"Office Chair ", price:90,image:"C:/Users/macha/OneDrive/WAD/.vscode/ofchair.jpg" },
    {name: "Study Table" , price:110,image:"C:/Users/macha/OneDrive/WAD/.vscode/sdtable.jpg" },
    {name: "Photo Frame", price:108,image: "C:/Users/macha/OneDrive/WAD/.vscode/pframe.jpg"},
    {name:"Trolley Bag" , price:200,image:"C:/Users/macha/OneDrive/WAD/.vscode/trbag.jpg" },
    {name:"DIning Table" , price:400,image:"C:/Users/macha/OneDrive/WAD/.vscode/dining.jpg" },
];


// Function to display products
function displayProducts() {
    var productsList = document.getElementById("products-list");
    productsList.innerHTML = ""; // Clear previous list
    products.forEach(function(product) {
        var listItem = document.createElement("li");
        // Create image element
        var img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        listItem.appendChild(img);
        // Create product details
        var details = document.createElement("div");
        details.textContent = product.name + " - $" + product.price;
        listItem.appendChild(details);
        // Add button
        var addButton = document.createElement("button");
        addButton.textContent = "Add to Cart";
        addButton.addEventListener("click", function() {
            addToCart(product);
        });
        listItem.appendChild(addButton);
        productsList.appendChild(listItem);
    });
}

// Function to handle adding a product to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    var existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        alert("This product is already in your cart.");
        return;
    }
    
    // Add the product to the cart
    cart.push(product);
    alert("Product added to cart successfully!");
}

// Function to handle view cart button click

document.getElementById("view-cart-btn").addEventListener("click", function() {
    // Display the cart section
    showCart();
});


// Function to display cart section
function showCart() {
    document.getElementById("products").style.display = "none";
    document.getElementById("cart").style.display = "block";
    displayCart(); // Call the function to display the cart items
}

function displayCart() 
{
    
    var cartItemsContainer = document.getElementById("cart-items");
    // Clear previous cart items
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        // Display a message when the cart is empty
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Display each item in the cart
    cart.forEach(function(item) {
        var listItem = document.createElement("li");

        // Create image element
        var img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        listItem.appendChild(img);

        // Create product details
        var details = document.createElement("div");
        details.textContent = item.name + " - $" + item.price;
        listItem.appendChild(details);

        cartItemsContainer.appendChild(listItem);
    });
}


// Initial setup
showSignUp();
