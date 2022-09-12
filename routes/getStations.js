let networks = require("../db/localNetworks");

module.exports = (app) => {
  app.get("/stations", (req, res) => {
    if (req.body.country) {
      const stations = networks.filter(
        (network) => network.location.country === req.body.country
      );
      return res.json({ nbStations: stations.length });
    } else {
      const message =
        "Error, please specify the country code (ex: FR, DE, ...)";
      return res.json({ message });
    }
  });
};
