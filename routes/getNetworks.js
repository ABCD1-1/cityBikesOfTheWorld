let networks = require("../db/localNetworks");

module.exports = (app) => {
  app.get("/networks", (req, res) => {
    const networksLighted = [];
    if(req.body.city) {
        networks = networks.filter(network => network.location.city === req.body.city);
    } else if (req.body.name){
        networks = networks.filter(network => network.name === req.body.name);
    }
    networks.map((network) => {
      if (network.location) {
        const location = network.location;
        delete network.location;
        network.city = location.city;
        network.country = location.country;
        networksLighted.push(network);
      }
    });
    return res.json({ networks: networksLighted });
  });
};
