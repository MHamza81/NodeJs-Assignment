const calculateCommission = require('../index.js').calculateCommission;

const testData1 = {
    sale_price: 150000,
    incentives: {
            "condition":"rough",
            "type":"car_condition_sales",
            "commission_percentage": 3
    }
};

const testData2 = {
    sale_price: 150000,
    incentives: {
            "condition":"rough",
            "type":"car_condition_sales",
            "commission_percentage": -1
    }
};

test('Should calculate commission based on sale price and incentive percentage', () => {
    expect(calculateCommission(testData1.sale_price, testData1.incentives)).toBe(4500);
});

test('Should throw an error for invalid data arguments', () => {
    expect(() => {
        calculateCommission(testData2.sale_price, testData2.incentives)
    }).toThrow('Invalid Data.');
});



