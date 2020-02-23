let calculateBrandIncentive = require('../index.js').calculateBrandIncentive;

let testData = {
    sale: {
		"car_id":"ABH659334",
		"sold_on":"20-1-2010",
		"sale_price":252000,
    },
    incentives: [
        {
            "car_brand":"Suzuki",
            "type":"car_brand_sales",
            "commission_percentage":2	
        }
    ],
    cars: [
        {
            "id":"ABH659334",
            "brand":"Suzuki",
            "model":2001,
            "condition":"new",
            "color":"black"
        }       
    ]
};

let testData2 = {
    sale: {
		"car_id":"ABH659334",
		"sold_on":"20-1-2010",
		"sale_price":252000,
    },
    incentives: [
        {
            // "car_brand":"Suzuki",
            "type":"car_brand_sales",
            "commission_percentage":2	
        }
    ],
    cars: [
        {
            "id":"ABH659334",
            "brand":"Suzuki",
            "model":2001,
            "condition":"new",
            "color":"black"
        }       
    ]
};

test('Should calculate incentive on brand basis', () => {
    expect(calculateBrandIncentive(testData.sale, testData.incentives, testData.cars)).toBe(5040);
});

test('Should throw an error for invalid data arguments', () => {
    expect(() => {
        calculateBrandIncentive(testData2.sale, testData2.incentives, testData2.cars)
    }).toThrow('Invalid Data.');
});
