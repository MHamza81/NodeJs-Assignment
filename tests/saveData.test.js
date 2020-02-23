let saveData = require('../index.js').saveData;

let testData = [ 
    [ 'Hamza1122', 'Muhammad Hamza', 275000],
];

let testData2 = [ {id: "222", name: "Hamza", totalIncentive: 275000} 
];

test('Should return true with correct data format', () => {
    expect(saveData(testData)).toBe(true);
});

test('Should throw an error for invalid data format', () => {
    expect(() => {
        saveData(testData2.sale, testData2.incentives)
    }).toThrow('Invalid Data.');
});