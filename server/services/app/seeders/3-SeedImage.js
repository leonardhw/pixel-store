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
      "Images",
      [
        {
          id: 1,
          productId: 1,
          imgUrl: "https://lh3.googleusercontent.com/5fFj4Ta6TmwGOGjbfRPWGVAA8LtKN-ovlQP7N9m33G0pq6Zu8ynP6Lze4QMk-YI4n7AeKG9UGMsCj7rw-OgVN8VQSU4Jj2JeObQ=s1400-w1400-e365-rp",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
        },
        {
          id: 2,
          productId: 1,
          imgUrl: "https://lh3.googleusercontent.com/9oR3FD03rs5mf5stlHARnqc8av940NVQ9TV0kdS3UxL1mNAdwWMJQw26SZD3_nCN4WMAGZGe95okIFhqPmwv9kRchDmQB6fc1jE=s0",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
        },
        {
          id: 3,
          productId: 1,
          imgUrl: "https://lh3.googleusercontent.com/lNy_tmKZdLhrx28jsS8HeOKFdpFX53kE97VMSEtZwEwrtShY1C3Gfc-Cer2U6tv2gozQYZsEltlF0MRaN8kEKcnLCgkOCy-U23A=s0",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
        },
        {
          id: 4,
          productId: 2,
          imgUrl: "https://lh3.googleusercontent.com/8XsOhYb3FF1wHrjn5vYr4kktyKpxyH4MnBIFai0_Ulesy7zA-30f5YUFH2cotlDKQcMWBiEQgFFFZmAAYXAadHQdnlmCUsWWRg=s1400-w1400-e365-rp",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
        },
        {
          id: 5,
          productId: 2,
          imgUrl: "https://lh3.googleusercontent.com/c5JwVTRaocfSHEHp3-gjuEiLENXhHOaW9JvxMPs99woI2GFiBgB76fIAsnUPPRuNmpk2AAAP9Qs_8K7i3XlQyFGdYPYu-LAduceQ=s1400-w1400-e365-rp",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
        },
        {
          id: 6,
          productId: 2,
          imgUrl: "https://lh3.googleusercontent.com/zTUwNrMXQA0qkGDy8XISyJ5eED2sqbRfHjEe86jvGuGT-2BnU8rSt6qfn2HEx8-3KgVHz5l7XrZ1CYUfylCyC5mJJUjPboGUIVmc=s0",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
        },
        {
          id: 7,
          productId: 3,
          imgUrl: "https://lh3.googleusercontent.com/zTUwNrMXQA0qkGDy8XISyJ5eED2sqbRfHjEe86jvGuGT-2BnU8rSt6qfn2HEx8-3KgVHz5l7XrZ1CYUfylCyC5mJJUjPboGUIVmc=s0",
          createdAt: "2022-11-14",
          updatedAt: "2022-11-14",
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
    await queryInterface.bulkDelete("Images", null, {});
  },
};
