const mongoose = require("mongoose"),
    Record = require("./models/record");

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/docucare",
    { useNewUrlParser: true }
);

Record.remove({})
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 08:00:00'),
            problem: "Left knee pain",
            status: "Checked out",
            patient: "60ae749dc8fbba000a7309aa",
            provider: "60ae74a467f70000156bdc12",
            hpi: "Erika presents today for left knee pain.",
            ros: "She denies any numbness or tingling.",
            exam: "She is tender over the medial joint line."
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('Apr 5, 2021 08:00:00'),
            problem: "Right ankle sprain",
            patient: "60ae749dc8fbba000a7309aa",
            provider: "60ae74a467f70000156bdc12",
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('Feb 16, 2021 08:00:00'),
            problem: "Dizziness",
            patient: "60ae749dc8fbba000a7309aa",
            provider: "60ae74a467f70000156bdc12",
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 09:00:00'),
            status: "Checked out",
            problem: "Depression",
            patient: "60ae749dc8fbba000a7309ab",
            provider: "60ae74a467f70000156bdc12",
            hpi: "Paul presents today for depression.",
            ros: "He admits fatigue. He denies any changes in apetite.",
            exam: "He has a flat affect."
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 10:00:00'),
            status: "Waiting",
            problem: "Headaches",
            patient: "60ae749ec8fbba000a7309ac",
            provider: "60ae74a467f70000156bdc12"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 11:00:00'),
            status: "Ready",
            problem: "Cough",
            patient: "60ae749ec8fbba000a7309ad",
            provider: "60ae74a467f70000156bdc12"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 12:00:00'),
            problem: "Chest pain",
            patient: "60ae749ec8fbba000a7309ae",
            provider: "60ae74a467f70000156bdc12"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 13:00:00'),
            problem: "Nausea",
            patient: "60ae749ec8fbba000a7309af",
            provider: "60ae74a467f70000156bdc12"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .catch(error => console.log(error.message))
    .then(() => {
        console.log("DONE");
        mongoose.connection.close();
    });