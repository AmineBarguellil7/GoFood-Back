const express = require("express");
const Router = express.Router();



Router.post(
    "/foodData",(req, res) => {  
      try {
        // console.log(global.food_items);
        res.send([global.food_items,global.foodCategory]);
      } catch (error) {
        console.log(error.message);
        console.log("Server Error");
      }
    }
  );


module.exports = Router;