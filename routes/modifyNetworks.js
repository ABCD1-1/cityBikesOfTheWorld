let networks = require("../db/localNetworks");

const updateProperty = (data, property, reqBody, newPropertyData) => {
  data.map((datum) => {
    if (datum[property] === reqBody[property]) {
      console.log(datum[property]);
      console.log(property);
      datum[property] = newPropertyData;
      console.log("ok ici", newPropertyData);
    }
  });
};

module.exports = (app) => {
  app.put("/networks", (req, res) => {
    const reqBody = req.body;
    if (reqBody.name || reqBody.city || reqBody.country || reqBody.company) {
      const acceptedProperties = [];
      
      console.log(acceptedProperties.length);
      if (reqBody.name && reqBody.newName) {
        acceptedProperties.push(["name", "newName"]);
      }
      if (reqBody.city && reqBody.city) {
        acceptedProperties.push(["city", "newCity"]);
      }
      if (reqBody.country && reqBody.country) {
        acceptedProperties.push(["country", "newCountry"]);
      }
      if (reqBody.company && reqBody.company) {
        acceptedProperties.push(["company", "newCompany"]);
      }
      
      if (acceptedProperties.length === 0) {
        console.log("ici");
        const message =
          "Error, the payload need to contain at least one of these properties : name, company, city, country, and the associated modfification newName, newCompany, newCity, newCountry";
        return res.json({ message });
      }
      //console.log(acceptedProperties);
      networks.map((network) => {
        if (network.location) {
          const location = network.location;
          delete network.location;
          network.city = location.city;
          network.country = location.country;
        }
      });
      acceptedProperties.map((properties) => {
        updateProperty(
          networks,
          properties[0],
          reqBody,
          reqBody[properties[1]]
        );
        //console.log(
        //  properties[0],
        //  properties[1],
        //  reqBody[properties[0]],
        //  reqBody[properties[1]]
        //);
      });
      return res.json({ modifiedNetworks: networks });
    } else {
      const message =
        "Error, the payload need to contain at least one of these properties : name, company, city, country, and the associated modfification newName, newCompany, newCity, newCountry";
      return res.json({ message });
    }
  });
};
