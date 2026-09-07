const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const contactButton = document.getElementById("contactButton");
const contactMessage = document.getElementById("contactMessage");
const year = document.getElementById("year");

// Display current year
year.textContent = new Date().getFullYear();

// Dark mode toggle
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light Mode";
    } else {
        themeToggle.textContent = "Dark Mode";
    }
});

// Mobile navigation
menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Contact interaction
contactButton.addEventListener("click", function () {
    contactMessage.textContent =
        "Thanks for visiting my portfolio. Feel free to connect with me through GitHub or LinkedIn.";
});

// Close mobile menu after selecting a navigation link
const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});
