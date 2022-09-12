let networks = require("../db/localNetworks");

module.exports = (app) => {
  app.post("/networks", (req, res) => {
    const reqBody = req.body;
    if (reqBody.name && reqBody.city && reqBody.country && reqBody.company) {
      const networkCreated = {
        name: reqBody.name,
        city: reqBody.city,
        country: reqBody.country,
        company: reqBody.company,
        id: req.body.name + "-" + req.body.city,
      };

      networks.push(networkCreated);
      return res.json({ createdNetwork: networkCreated });
    } else {
      const message =
        "Error, the payload need to contain these properties : name, company, city, country";
      return res.json({ message });
    }
  });
};
