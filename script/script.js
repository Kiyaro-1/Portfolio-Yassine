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

// Function to dynamically create HTML elements from a JSON file
function createContentFromJSON(
  jsonUrl,
  containerSelector,
  cardClass,
  cardTemplate
) {
  const container = document.querySelector(containerSelector);
  let row = document.createElement("div");
  row.classList.add("row");

  // Load the JSON file
  fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Iterate through the JSON data and create HTML elements
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        card.innerHTML = cardTemplate(item);

        // Append the card to the current row
        row.appendChild(card);

        // If the index is a multiple of 3 or it's the last element, create a new row
        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Template for skills cards
function skillsCardTemplate(item) {
  return `
    <div class="card skillsText">
        <div class="card-body">
            <img src="./images/${item.image}" alt="${item.alt}"/>
            <h3 class="card-title mt-3">${item.title}</h3>
            <p class="card-text mt-3">${item.text}</p>
        </div>
    </div>`;
}

// Template for portfolio cards
function portfolioCardTemplate(item) {
  const logosHtml = item.logos
    .map(
      (logo) =>
        `<img src="${logo.src}" alt="${logo.alt} logo" class="portfolio-logo" style="width:30px; height:auto; margin: 5px;">`
    )
    .join(" ");
  return `
    <div data-cy="project-home" class="card portfolioContent">
        <img data-cy="project-img" class="card-img-top" src="images/${item.image}" alt="${item.alt}" style="width:100%">
        <div class="card-body">
            <h3 data-cy="project-title" class="card-title">${item.title}</h3>
            <div class="logo-container text-center">
                ${logosHtml}
            </div>
            <p data-cy="project-description" class="card-text">${item.text}</p>
            <div class="text-center">
                <a href="${item.link}" data-cy="project-link" class="btn btn-success">Voir Projet</a>
                <a href="${item.github}" data-cy="project-github_link" class="btn btn-success2"><i class="fa-brands fa-github"></i>Voir Code</a>
            </div>
        </div>
    </div>`;
}

// Call the functions
handleNavbarScroll();
handleNavbarCollapse();
createContentFromJSON(
  "data/skills.json",
  "#skills .container",
  "skillsText",
  skillsCardTemplate
);
createContentFromJSON(
  "data/portfolio.json",
  "#portfolio .container",
  "portfolioContent",
  portfolioCardTemplate
);
