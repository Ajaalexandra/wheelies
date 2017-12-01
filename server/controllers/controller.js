module.exports = {
  getProducts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_products()
      .then(products => res.status(200).json(products))
      .catch(() => res.status(500).json());
  },

  getProductsById: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_products_by_id([req.params.id])
      .then(products => res.status(200).json(products))
      .catch(() => res.status(500).json());
  },

  getFeaturedProducts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_featured_products()
      .then(featured => {
        res.status(200).json(featured);
      })
      .catch(() => res.status(500).json());
  }
};
