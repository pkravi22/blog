const ensureAuthentication = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/",ensureAuthentication, (req, res) => {
  res.status(200).json([
    {
      name: "product1",
      price: 10.99,
    },
    
  ]);
  console.log("Products route");
});
module.exports = router;
