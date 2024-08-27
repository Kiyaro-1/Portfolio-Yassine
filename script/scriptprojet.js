// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 100) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
}

// Function to get the base name of the current page's URL (without extension)
function getPageBaseName() {
  const path = window.location.pathname; // Get the path from the URL
  const baseName = path.substring(
    path.lastIndexOf("/") + 1,
    path.lastIndexOf(".")
  ); // Extract the base name
  return baseName;
}

// Function to fetch JSON data and populate the carousel
function populateCarousel(jsonUrl) {
  fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const carouselInner = document.querySelector(".carousel-inner");
      const carouselIndicators = document.querySelector(".carousel-indicators");

      // Clear previous content
      carouselInner.innerHTML = "";
      carouselIndicators.innerHTML = "";

      data.forEach((item, index) => {
        // Create carousel item
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) carouselItem.classList.add("active"); // Set the first item as active

        carouselItem.innerHTML = `
                    <img src="${item.src}" class="d-block w-100" alt="${item.alt}">
                `;

        carouselInner.appendChild(carouselItem);

        // Create indicator
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carousel-showcase");
        indicator.setAttribute("data-bs-slide-to", index);
        if (index === 0) indicator.classList.add("active"); // Set the first indicator as active
        indicator.classList.add("carousel-indicator"); // Add a custom class for styling

        // Add a span with text to describe the slide
        const indicatorText = document.createElement("span");
        indicatorText.classList.add("visually-hidden"); // Use this class to hide text visually but keep it accessible
        indicatorText.textContent = `Slide ${index + 1}`;
        indicator.appendChild(indicatorText);

        carouselIndicators.appendChild(indicator);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the functions to execute the code
document.addEventListener("DOMContentLoaded", function () {
  const baseName = getPageBaseName();
  const jsonFile = `data/${baseName}.json`; // e.g., 'kasa.json' or 'kasa2.json'

  populateCarousel(jsonFile);
});

// Call the functions
handleNavbarScroll();
handleNavbarCollapse();
