const mongoose = require("mongoose"),
    Provider = require("./models/provider");

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/docucare",
    { useNewUrlParser: true }
);

Provider.remove({})
    .then(() => {
        return Provider.create({
            name: {
                first: "Andy",
                last: "Le"
            },
            username: "andyle"
        });
    })
    .then(provider => console.log(provider.fullName))
    .catch(error => console.log(error.message))
    .then(() => {
        console.log("DONE");
        mongoose.connection.close();
    });