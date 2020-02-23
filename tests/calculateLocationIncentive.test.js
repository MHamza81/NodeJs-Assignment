const calculateLocationIncentive = require('../index.js').calculateLocationIncentive;

let testData1 = {
    sale: {
		"car_id":"DCF12094",
		"sold_on":"20-1-2010",
		"sale_price":104000,
		"sale_location":"Multan",
		"salesman_id":"QASIM123"
    },
    incentives: [
        {
            "location": "Multan",
            "type":"location_sales",
            "min_sales":100000,
            "commission_percentage":8	
        }
    ]
};

let testData2 = {
    sale: {
		"car_id":"DCF12094",
		"sold_on":"20-1-2010",
		"sale_price": -1104000,
		"sale_location":11111,
		"salesman_id":"QASIM123"
    },
    incentives: [
        {
            "location": "Multan",
            "type":"location_sales",
            "min_sales":100000,
            "commission_percentage":8	
        }
    ]
};

test('Should calculate incentive on location basis', () => {
    expect(calculateLocationIncentive(testData1.sale, testData1.incentives)).toBe(8320);
});

test('Should throw an error for invalid data arguments', () => {
    expect(() => {
        calculateLocationIncentive(testData2.sale, testData2.incentives)
    }).toThrow('Invalid Data.');
});
