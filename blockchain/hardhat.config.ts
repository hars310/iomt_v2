require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
      sepolia: {
          url: process.env.API_URL,
          accounts: [process.env.PRIVATE_KEY],
       },
    },
};