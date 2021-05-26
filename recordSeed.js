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
            patient: "60a7267a52578f640c87e30a",
            provider: "60a4814bc1b17d208033beb2",
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
            patient: "60a7267a52578f640c87e30a",
            provider: "60a4814bc1b17d208033beb2",
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('Feb 16, 2021 08:00:00'),
            problem: "Dizziness",
            patient: "60a7267a52578f640c87e30a",
            provider: "60a4814bc1b17d208033beb2",
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 09:00:00'),
            problem: "Depression",
            patient: "60a7267a52578f640c87e30b",
            provider: "60a4814bc1b17d208033beb2",
            hpi: "Paul presents today for depression.",
            ros: "He admits fatigue. He denies any changes in apetite.",
            exam: "He has a flat affect."
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 10:00:00'),
            problem: "Headaches",
            patient: "60a7267a52578f640c87e30c",
            provider: "60a4814bc1b17d208033beb2"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 11:00:00'),
            status: "Waiting",
            problem: "Cough",
            patient: "60a7267a52578f640c87e30d",
            provider: "60a4814bc1b17d208033beb2"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 12:00:00'),
            status: "Ready",
            problem: "Chest pain",
            patient: "60a7267a52578f640c87e30e",
            provider: "60a4814bc1b17d208033beb2"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .then(() => {
        return Record.create({
            date: new Date('May 18, 2021 13:00:00'),
            status: "Checked out",
            problem: "Nausea",
            patient: "60a7267a52578f640c87e30f",
            provider: "60a4814bc1b17d208033beb2"
        });
    })
    .then(record => console.log(`${record.patient}, ${record.date}`))
    .catch(error => console.log(error.message))
    .then(() => {
        console.log("DONE");
        mongoose.connection.close();
    });