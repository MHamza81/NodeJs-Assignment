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

// test('Should throw an error if incentives is null', () => {
//     expect(() => {
//         calculateLocationIncentive(testData3.sale, testData3.incentives)
//     }).toThrow('Invalid Data.');
// });

// test('Should throw an error if sale is not an object', () => {
//     expect(() => {
//         calculateLocationIncentive(testData4.sale, testData4.incentives)
//     }).toThrow('Invalid Data.');
// });

// test('Should throw an error if incentives is not an object', () => {
//     expect(() => {
//         calculateLocationIncentive(testData5.sale, testData5.incentives)
//     }).toThrow('Invalid Data.');
// });

// test('Should throw an error if sale price is not a number', () => {
//     expect(() => {
//         calculateLocationIncentive(testData6.sale, testData6.incentives)
//     }).toThrow('Invalid Data.');
// });

// test('Should throw an error if sale price is a negative number', () => {
//     expect(() => {
//         calculateLocationIncentive(testData6.sale, testData6.incentives)
//     }).toThrow('Invalid Data.');
// });

// test('Should throw an error if sale location is not a string', () => {
//     expect(() => {
//         calculateLocationIncentive(testData6.sale, testData6.incentives)
//     }).toThrow('Invalid Data.');
// });