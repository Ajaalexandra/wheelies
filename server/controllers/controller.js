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
  },

  getFilteredProducts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // console.log(req.params.brand);
    dbInstance
      .get_filtered_products([req.params.brand])
      .then(filtered => {
        res.status(200).json(filtered);
      })
      .catch(() => res.status(500).json());
  },

  addToCart: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // console.log(req.body);
    dbInstance
      .add_to_cart([req.body.product_name, req.body.product_price])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).json());
  },

  getCart: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_cart()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).json());
  },

  deleteItemFromCart: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // console.log(dbInstance);
    dbInstance
      .delete_item_from_cart([req.params.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).json());
  },

  getCartTotal: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // console.log(dbInstance);
    dbInstance
      .get_cart_total()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).json());
  }
};
