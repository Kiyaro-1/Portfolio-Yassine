describe("Portfolio test page accueil", () => {
  const verifyArticleElements = ($article) => {
    // Verify elements within the article
    cy.wrap($article).within(() => {
      cy.get('[data-cy="project-img"]').should("be.visible");
      cy.get('[data-cy="project-title"]').should("be.visible");
      cy.get('[data-cy="project-description"]').should("be.visible");
      cy.get('[data-cy="project-link"]').should("be.visible");
      cy.get('[data-cy="project-github_link"]').should("be.visible");
    });
  };

  it("Verify projects and their showcase pages", () => {
    cy.visit("http://127.0.0.1:5500/index.html");

    cy.get('[data-cy="project-home"]').then(($articles) => {
      const articleCount = $articles.length;

      for (let index = 0; index < articleCount; index++) {
        // Re-fetch articles before each iteration
        cy.get('[data-cy="project-home"]')
          .eq(index)
          .then(($article) => {
            verifyArticleElements($article);

            cy.wrap($article).find('[data-cy="project-link"]').click();

            cy.get('[data-cy="detail-project-banner"]').should("be.visible", {
              timeout: 10000,
            });
            cy.get('[data-cy="detail-project-description"]').should(
              "be.visible",
              {
                timeout: 10000,
              }
            );
            cy.get('[data-cy="detail-project-showcase"]').should("be.visible", {
              timeout: 10000,
            });
            cy.get('[data-cy="detail-project-contact"]').should("be.visible", {
              timeout: 10000,
            });

            cy.go("back");

            // Ensure product elements are still visible after navigating back
            cy.get('[data-cy="project-home"]').should("exist");
          });
      }
    });
  });
});
