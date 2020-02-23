let calculateDatesSalesIncentive = require('../index.js').calculateDatesSalesIncentive;

let testData = {
    sale: {
		"car_id":"ABH65922Z",
		"sold_on":"25-2-2017",
		"sale_price":301000,
		"sale_location":"Lahore",
		"salesman_id":"QASIM123"
    },
    incentives: [
        {
            "start_date":"01-02-2017",
            "end_date":"01-03-2017",
            "type":"sale_period",
            "commission_percentage":5
        }
    ]
};

let testData2 = {
    sale: {
		"car_id":"ABH65922Z",
		"sold_on":"25-2-2017",
		"sale_price":301000,
		"sale_location":"Lahore",
		"salesman_id":"QASIM123"
    },
    incentives: [
        {   
            // "start_date":"01-29-2017",
            "start_date":"01-02-2017",
            "end_date":"01-03-2017",
            "type":"sale_period",
            "commission_percentage":"5"
        }
    ]
};

test('Should calculate incentive on sale dates basis', () => {
    expect(calculateDatesSalesIncentive(testData.sale, testData.incentives)).toBe(15050);
});

test('Should throw an error for invalid data arguments', () => {
    expect(() => {
        calculateDatesSalesIncentive(testData2.sale, testData2.incentives)
    }).toThrow('Invalid Data.');
});