"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Pixel 7 Pro",
          slug: "pixel_7_pro",
          description: "The all-pro Google phone.",
          price: 899,
          stock: 100,
          mainImg: "https://lh3.googleusercontent.com/lNy_tmKZdLhrx28jsS8HeOKFdpFX53kE97VMSEtZwEwrtShY1C3Gfc-Cer2U6tv2gozQYZsEltlF0MRaN8kEKcnLCgkOCy-U23A=s0",
          categoryId: 2,
          authorId: 1,
          userId: "6384a6dddc98b5e9aff3b5c1",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
        },
        {
          name: "Pixel 7",
          slug: "pixel_7",
          description: "Simply powerful. Super helpful.",
          price: 599,
          stock: 200,
          mainImg: "https://lh3.googleusercontent.com/zTUwNrMXQA0qkGDy8XISyJ5eED2sqbRfHjEe86jvGuGT-2BnU8rSt6qfn2HEx8-3KgVHz5l7XrZ1CYUfylCyC5mJJUjPboGUIVmc=s0",
          categoryId: 1,
          authorId: 1,
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
          userId: "6384a6dddc98b5e9aff3b5c1",
        },
        {
          name: "Google Pixel Watch",
          slug: "google_pixel_watch",
          description: "The all-pro Google phone.",
          price: 349,
          stock: 300,
          mainImg: "https://lh3.googleusercontent.com/zTUwNrMXQA0qkGDy8XISyJ5eED2sqbRfHjEe86jvGuGT-2BnU8rSt6qfn2HEx8-3KgVHz5l7XrZ1CYUfylCyC5mJJUjPboGUIVmc=s0",
          categoryId: 2,
          authorId: 1,
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
          userId: "6384a6dddc98b5e9aff3b5c1",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
