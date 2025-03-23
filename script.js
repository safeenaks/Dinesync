function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    let role = document.getElementById("role").value;
    let username = document.getElementById("username").value.trim().toLowerCase();
    let password = document.getElementById("password").value.trim();

    if (!role) {
        alert("Please select a role before logging in!");
        return;
    }

    if (role === "student") {
        window.location.href = "student.html";
    } else if (role === "manager") {
        window.location.href = "manager.html";
    } else {
        alert("Invalid selection!");
    }
}
function showMenu(day) {
    // Hide all menu days
    let menus = document.querySelectorAll(".menu-day");
    menus.forEach(menu => {
        menu.style.display = "none";
    });

    // Show the selected day
    document.getElementById(day).style.display = "block";
}

// Show Monday’s menu by default
document.addEventListener("DOMContentLoaded", function() {
    showMenu('monday');
});

// Meal Data
const meals = {
    monday: {
        breakfast: "Puttu with kadala curry / Egg roast with appam",
        lunch: "Kerala sadhya (rice, sambar, thoran, avial, pappadam, pickle) / Meen curry with matta rice",
        snacks: "Pazhampori / Egg puffs",
        dinner: "Ulli theeyal with rice / Chicken curry with chapati"
    },
    tuesday: {
        breakfast: "Idiyappam with coconut milk / Mutta curry with idiyappam",
        lunch: "Moru curry with matta rice & thoran / Kerala-style beef fry with parotta",
        snacks: "Parippu vada / Chicken samosa",
        dinner: "Chena mezhukkupuratti with rice / Prawn roast with rice"
    },
    wednesday: {
        breakfast: "Dosa with chutney & sambar / Nadan mutta dosa",
        lunch: "Pulissery with rice & upperi / Malabar chicken biryani with raita",
        snacks: "Banana chips / Chicken cutlet",
        dinner: "Vendakka thoran with rice / Fish fry with kanji"
    },
    thursday: {
        breakfast: "Appam with vegetable stew / Mutton stew with appam",
        lunch: "Kootu curry with rice / Prawns theeyal with rice",
        snacks: "Kappa with chammanthi / Beef fry with pathiri",
        dinner: "Chakka curry with rice / Squid roast with rice"
    },
    friday: {
        breakfast: "Pathiri with coconut milk & sugar / Chicken curry with pathiri",
        lunch: "Theeyal with rice & mezhukkupuratti / Malabar fish curry with matta rice",
        snacks: "Sugiyan / Chicken spring rolls",
        dinner: "Cabbage thoran with rice / Nadan kozhi peralan"
    },
    saturday: {
        breakfast: "Kozhukatta / Duck roast with appam",
        lunch: "Erissery with rice & pappadam / Kerala-style beef curry with porotta",
        snacks: "Unniyappam / Egg bajji",
        dinner: "Avial with rice / Crab roast with rice"
    },
    sunday: {
        breakfast: "Neypathal with coconut chutney / Kallappam with mutta curry",
        lunch: "Kerala sadhya (rice, sambar, avial, kalan, pappadam, payasam) / Mutton chaps with ghee rice",
        snacks: "Ela ada / Chicken kebabs",
        dinner: "Thakkali curry with rice / Meen pollichathu"
    }
};

// Function to show meals for the selected day
function showMeals() {
    let day = document.getElementById("day-select").value;
    let mealSection = document.getElementById("meal-section");
    
    if (day) {
        document.getElementById("selected-day").innerText = `Meals for ${day.charAt(0).toUpperCase() + day.slice(1)}`;
        document.getElementById("breakfast").innerText = meals[day].breakfast;
        document.getElementById("lunch").innerText = meals[day].lunch;
        document.getElementById("snacks").innerText = meals[day].snacks;
        document.getElementById("dinner").innerText = meals[day].dinner;
        mealSection.style.display = "block";
    } else {
        mealSection.style.display = "none";
    }
}

// Function to book a meal
function bookMeal(mealType) {
    let bookingCode = "DS" + Math.floor(100000 + Math.random() * 900000); // Generate unique code
    alert(`Booked Successfully!\nYour Booking Code: ${bookingCode}`);
}
// Store booked meals in localStorage
let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];

// Function to show booked meals
function showBookedMeals() {
    let list = document.getElementById("booked-meals-list");
    list.innerHTML = ""; // Clear previous list

    if (bookedMeals.length === 0) {
        list.innerHTML = "<li>No meals booked yet.</li>";
        return;
    }

    bookedMeals.forEach((meal, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${meal.day} - ${meal.mealType} (Code: ${meal.code})`;
        list.appendChild(listItem);
    });
}

// Function to show meal cancel options
function showCancelOptions() {
    let day = document.getElementById("cancel-day").value;
    let mealCancelSection = document.getElementById("meal-cancel-section");

    if (day) {
        mealCancelSection.style.display = "block";
    } else {
        mealCancelSection.style.display = "none";
    }
}

// Function to book a meal (from book-meal.html)
function bookMeal(mealType) {
    let day = document.getElementById("day-select").value;
    if (!day) {
        alert("Please select a day first.");
        return;
    }

    let bookingCode = "DS" + Math.floor(100000 + Math.random() * 900000);
    bookedMeals.push({ day, mealType, code: bookingCode });

    localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));
    alert(`Booked Successfully!\nYour Booking Code: ${bookingCode}`);

    showBookedMeals(); // Refresh booked meals
}

// Function to cancel a meal
function cancelMeal() {
    let day = document.getElementById("cancel-day").value;
    let mealType = document.getElementById("cancel-meal").value;

    if (!day || !mealType) {
        alert("Please select both a day and a meal to cancel.");
        return;
    }

    let index = bookedMeals.findIndex(meal => meal.day === day && meal.mealType === mealType);

    if (index !== -1) {
        bookedMeals.splice(index, 1);
        localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));
        alert("Cancelled Successfully!");
        showBookedMeals(); // Refresh list
    } else {
        alert("You have not booked this meal.");
    }
}

// Load booked meals when cancel page loads
document.addEventListener("DOMContentLoaded", showBookedMeals);
// Function to book a meal
function bookMeal(username, day, mealType) {
    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];

    let orderCode = "ORDER" + Math.floor(1000 + Math.random() * 9000); // Generate unique order code

    let newOrder = {
        username: username,
        orderCode: orderCode,
        day: day,
        mealType: mealType
    };

    bookedMeals.push(newOrder);
    localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));

    alert("Meal booked successfully! Your order code: " + orderCode);
}
document.addEventListener("DOMContentLoaded", function () {
    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];

    let ordersTable = document.querySelector("#ordersTable tbody");
    if (ordersTable) {
        ordersTable.innerHTML = "";

        if (bookedMeals.length === 0) {
            ordersTable.innerHTML = "<tr><td colspan='4'>No orders found.</td></tr>";
        } else {
            bookedMeals.forEach(order => {
                let row = `
                    <tr>
                        <td>${order.orderCode || "N/A"}</td>
                        <td>${order.day || "N/A"}</td>
                        <td>${order.mealType || "N/A"}</td>
                        <td>${order.username || "N/A"}</td>
                    </tr>
                `;
                ordersTable.innerHTML += row;
            });
        }
    }
});

// Function to book a meal correctly
function bookMeal(day, mealType, username) {
    if (!day || !mealType || !username) {
        alert("Please select all required fields!");
        return;
    }

    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let orderCode = "ORD" + Math.floor(1000 + Math.random() * 9000); // Unique order code

    let newOrder = {
        orderCode: orderCode,
        day: day,
        mealType: mealType,
        username: username
    };

    bookedMeals.push(newOrder);
    localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));

    alert(`Booked Successfully! Your Order Code: ${orderCode}`);
}
document.addEventListener("DOMContentLoaded", function () {
    loadOrders();
    loadBookedMealsForCancellation();
});

function bookMeal() {
    let day = document.getElementById("daySelect").value;
    let mealType = document.querySelector('input[name="mealType"]:checked');
    let username = document.getElementById("username").value;

    if (!day || !mealType || !username) {
        alert("Please select all options and enter username.");
        return;
    }

    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let orderCode = "ORD" + Math.floor(1000 + Math.random() * 9000);

    let newOrder = {
        orderCode: orderCode,
        day: day,
        mealType: mealType.value,
        username: username
    };

    bookedMeals.push(newOrder);
    localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));

    alert(`Booked Successfully! Your Order Code: ${orderCode}`);
}

function loadOrders() {
    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let ordersTable = document.querySelector("#ordersTable tbody");

    if (ordersTable) {
        ordersTable.innerHTML = "";
        if (bookedMeals.length === 0) {
            ordersTable.innerHTML = "<tr><td colspan='4'>No orders found.</td></tr>";
        } else {
            bookedMeals.forEach(order => {
                let row = `
                    <tr>
                        <td>${order.orderCode || "N/A"}</td>
                        <td>${order.day || "N/A"}</td>
                        <td>${order.mealType || "N/A"}</td>
                        <td>${order.username || "N/A"}</td>
                    </tr>
                `;
                ordersTable.innerHTML += row;
            });
        }
    }
}

function loadBookedMealsForCancellation() {
    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let daySelect = document.getElementById("cancelDaySelect");
    let mealSelect = document.getElementById("cancelMealType");

    if (!daySelect || !mealSelect) return;

    daySelect.innerHTML = "";
    mealSelect.innerHTML = "";

    let uniqueDays = [...new Set(bookedMeals.map(meal => meal.day))];

    uniqueDays.forEach(day => {
        let option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    });

    daySelect.addEventListener("change", function () {
        mealSelect.innerHTML = "";
        let selectedDay = this.value;
        let mealsForDay = bookedMeals.filter(meal => meal.day === selectedDay);
        let uniqueMeals = [...new Set(mealsForDay.map(meal => meal.mealType))];

        uniqueMeals.forEach(meal => {
            let option = document.createElement("option");
            option.value = meal;
            option.textContent = meal;
            mealSelect.appendChild(option);
        });
    });

    if (uniqueDays.length > 0) {
        daySelect.dispatchEvent(new Event("change"));
    }
}

function cancelMeal() {
    let day = document.getElementById("cancelDaySelect").value;
    let mealType = document.getElementById("cancelMealType").value;

    if (!day || !mealType) {
        alert("Please select day and meal type.");
        return;
    }

    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    bookedMeals = bookedMeals.filter(meal => meal.day !== day || meal.mealType !== mealType);

    localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));

    alert("Meal cancelled successfully!");
    loadOrders();
    loadBookedMealsForCancellation();
}
document.addEventListener("DOMContentLoaded", function () {
    loadCancelledMeals();
    loadMenu();
});

function cancelMeal() {
    let day = document.getElementById("cancelDaySelect").value;
    let mealType = document.getElementById("cancelMealType").value;

    if (!day || !mealType) {
        alert("Please select day and meal type.");
        return;
    }

    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let cancelledMeals = JSON.parse(localStorage.getItem("cancelledMeals")) || [];

    let mealIndex = bookedMeals.findIndex(meal => meal.day === day && meal.mealType === mealType);

    if (mealIndex !== -1) {
        let cancelledMeal = bookedMeals.splice(mealIndex, 1)[0];
        cancelledMeal.cancelledCode = "CNL" + Math.floor(1000 + Math.random() * 9000);
        cancelledMeals.push(cancelledMeal);

        localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));
        localStorage.setItem("cancelledMeals", JSON.stringify(cancelledMeals));

        alert("Meal cancelled successfully!");
        loadOrders();
        loadCancelledMeals();
        loadBookedMealsForCancellation();
    } else {
        alert("No such meal found.");
    }
}

function loadCancelledMeals() {
    let cancelledMeals = JSON.parse(localStorage.getItem("cancelledMeals")) || [];
    let cancelledTable = document.querySelector("#cancelledTable tbody");

    if (cancelledTable) {
        cancelledTable.innerHTML = "";
        if (cancelledMeals.length === 0) {
            cancelledTable.innerHTML = "<tr><td colspan='3'>No cancelled meals.</td></tr>";
        } else {
            cancelledMeals.forEach(meal => {
                let row = `
                    <tr>
                        <td>${meal.cancelledCode || "N/A"}</td>
                        <td>${meal.day || "N/A"}</td>
                        <td>${meal.mealType || "N/A"}</td>
                    </tr>
                `;
                cancelledTable.innerHTML += row;
            });
        }
    }
}

function addFood() {
    let foodName = document.getElementById("foodName").value.trim();
    let mealType = document.getElementById("mealType").value;

    if (!foodName) {
        alert("Enter a valid food name.");
        return;
    }

    let menu = JSON.parse(localStorage.getItem("menu")) || [];

    menu.push({ foodName, mealType });

    localStorage.setItem("menu", JSON.stringify(menu));
    alert("Food added successfully!");
    loadMenu();
}

function loadMenu() {
    let menu = JSON.parse(localStorage.getItem("menu")) || [];
    let menuTable = document.querySelector("#menuTable tbody");

    if (menuTable) {
        menuTable.innerHTML = "";
        if (menu.length === 0) {
            menuTable.innerHTML = "<tr><td colspan='3'>No menu items available.</td></tr>";
        } else {
            menu.forEach((item, index) => {
                let row = `
                    <tr>
                        <td>${item.foodName}</td>
                        <td>${item.mealType}</td>
                        <td><button onclick="deleteFood(${index})">Delete</button></td>
                    </tr>
                `;
                menuTable.innerHTML += row;
            });
        }
    }
}

function deleteFood(index) {
    let menu = JSON.parse(localStorage.getItem("menu")) || [];
    menu.splice(index, 1);

    localStorage.setItem("menu", JSON.stringify(menu));
    alert("Food deleted successfully!");
    loadMenu();
}
document.addEventListener("DOMContentLoaded", function () {
    loadSwapMealDetails();
});

function loadSwapMealDetails() {
    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let currentUser = localStorage.getItem("currentUser");

    let userMeal = bookedMeals.find(meal => meal.username === currentUser);

    if (userMeal) {
        document.getElementById("mealDay").textContent = userMeal.day;
        document.getElementById("mealType").textContent = userMeal.mealType;
        document.getElementById("username").textContent = userMeal.username;
    } else {
        document.getElementById("mealDetails").innerHTML = "<p>No meal found for swapping.</p>";
    }
}

function swapMeal() {
    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let currentUser = localStorage.getItem("currentUser");

    let userMealIndex = bookedMeals.findIndex(meal => meal.username === currentUser);

    if (userMealIndex !== -1) {
        let newMealType = prompt("Enter the meal type you want to swap to (Breakfast, Lunch, Snacks, Dinner):");
        let availableMeals = bookedMeals.filter(meal => meal.mealType === newMealType);

        if (availableMeals.length > 0) {
            let swapWithMeal = availableMeals[0]; // Selecting the first available meal for swapping

            let temp = bookedMeals[userMealIndex];
            bookedMeals[userMealIndex] = swapWithMeal;
            let swapIndex = bookedMeals.findIndex(meal => meal.username === swapWithMeal.username);
            bookedMeals[swapIndex] = temp;

            localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));

            alert("Meal swapped successfully!");
            loadSwapMealDetails();
        } else {
            alert("No available meals to swap with this type.");
        }
    } else {
        alert("No meal found to swap.");
    }
}
function fetchMealDetails() {
    let username = document.getElementById("usernameInput").value.trim();
    if (!username) {
        alert("Please enter your username.");
        return;
    }

    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let userMeal = bookedMeals.find(meal => meal.username === username);

    if (userMeal) {
        document.getElementById("mealType").textContent = userMeal.mealType;
        document.getElementById("swapPrompt").style.display = "block";
    } else {
        alert("No booked meal found for this username.");
        document.getElementById("swapPrompt").style.display = "none";
    }
}

function showSwapOptions() {
    document.getElementById("swapOptions").style.display = "block";
}

function cancelSwap() {
    alert("Meal swap cancelled.");
    document.getElementById("swapPrompt").style.display = "none";
}

function confirmSwap() {
    let username = document.getElementById("usernameInput").value.trim();
    let newMealType = document.getElementById("newMealType").value;

    let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || [];
    let userIndex = bookedMeals.findIndex(meal => meal.username === username);

    if (userIndex !== -1) {
        bookedMeals[userIndex].mealType = newMealType;
        localStorage.setItem("bookedMeals", JSON.stringify(bookedMeals));
        alert("Meal swapped successfully to " + newMealType);
        document.getElementById("swapOptions").style.display = "none";
    } else {
        alert("Meal swap failed. User not found.");
    }
}
