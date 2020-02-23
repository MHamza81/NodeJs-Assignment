let calculateConditionIncentive = require('../index.js').calculateConditionIncentive;

let testData = {
    sale: {
		"car_id":"ABH65922Z",
		"sold_on":"20-1-2010",
		"sale_price":232000,
		"sale_location":"Lahore",
		"salesman_id":"QASIM123"
    },
    incentives: [
        {
            "condition":"rough",
            "type":"car_condition_sales",
            "commission_percentage":10
        }
    ],
    cars: [
        {
            "id":"ABH65922Z",
            "brand":"Honda",
            "model":2001,
            "condition":"rough",
            "color":"blue"
        }       
    ]
};

let testData2 = {
    sale: {
		"car_id":"ABH65922Z",
		"sold_on":"20-1-2010",
		"sale_price":232000,
		"sale_location":"Lahore",
		"salesman_id":"QASIM123"
    },
    incentives: [
        {
            "condition":"rough",
            "type":"car_condition_sales",
            "commission_percentage":10
        }
    ],
    cars: [
        {
            "id":"ABH65922Z",
            "brand":"Honda",
            "model":2001,
            // "condition":"rough",
            "color":"blue"
        }       
    ]
};

test('Should calculate incentive on condition basis', () => {
    expect(calculateConditionIncentive(testData.sale, testData.incentives, testData.cars)).toBe(23200);
});

test('Should throw an error for invalid data arguments', () => {
    expect(() => {
        calculateConditionIncentive(testData2.sale, testData2.incentives, testData2.cars)
    }).toThrow('Invalid Data.');
});