"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plan_1 = require("../models/Plan");
const Snacksbox_1 = require("../models/Snacksbox");
class SnacksBoxSeed {
    seedingSnacksboxProduct() {
        const snacksboxes = [];
        for (let i = 0; i < 1000; i++) {
            snacksboxes.push({ productId: Math.floor(10000000 + Math.random() * 90000000) });
        }
        Snacksbox_1.SnacksBox.find({}).then((boxes) => {
            if (boxes.length < 1000) {
                Snacksbox_1.SnacksBox.insertMany(snacksboxes).then(seededBoxes => {
                    console.log(`${seededBoxes.length} snacks boxes inserted`);
                });
            }
        }).catch(error => console.log("Something went wronf retrieving or seeding databse"));
    }
    seedingSnacksBoxPlan() {
        Plan_1.Plan.findOne({ title: "Snacksbox Plan" }).then(existingPlan => {
            if (!existingPlan) {
                const plan = new Plan_1.Plan({
                    title: "Snacksbox Plan",
                    description: "Adds 200 mb additional storage and 10,000 additional requests each month",
                    features: {
                        requestPerMonth: 10000,
                        storage: 200
                    },
                    price: 3,
                    currency: "USD",
                    paymentFrequency: "Monthly",
                });
                plan.save().then(() => console.log(`${plan.title} added to database`));
            }
        }).catch(error => console.log("Something went wrong retrieving or seeding database"));
    }
}
exports.default = new SnacksBoxSeed();
//# sourceMappingURL=snacksbox-seed.js.map