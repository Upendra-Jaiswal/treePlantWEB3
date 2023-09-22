module.exports = {
  networks: {
    development: {
       host: "localhost",
      //host: "http://127.0.0.1:7545",

      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200, // Default: 200
        },
      },
    },
  },
};
