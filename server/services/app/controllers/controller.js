const { Product, Category, User, Spec, Image } = require("./models/index");

app.post("/products", async (req, res) => {
  try {
    // Create new product
    const { name, description, price, stock, mainImg, categoryId, imageUrl } = req.body;
    const authorId = req.user.id;
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Transaction start
    const t = await sequelize.transaction();

    const addProduct = await Product.create({ name, slug, description, price, stock, mainImg, categoryId, authorId }, { transaction: t });

    if (!addProduct) {
      throw { name: "ADD_PRODUCT_FAILED" };
    }

    // Handle add images
    let imageArr = [];
    const addImage = await Image.bulkCreate();

    // Handle add spec
    const addSpec = await Spec.create();

    await t.commit();

    res.status(201).json({
      msg: `Product with Id: ${addProduct.id} successfully added`,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).json({ error });
  }
});