const fs = require('fs');
const carsData = require('./data/cars.json');
const incentivesData = require('./data/incentive.json');
const salesData = require('./data/sales.json');
const salesmenData = require('./data/salesmen.json');

//Function to calculate incentive for location based incentives
const calculateLocationIncentive = (sale, incentives) => {
	if (!sale || !incentives || typeof (sale) !== "object" || typeof (incentives) !== "object"
		|| typeof (sale.sale_price) !== "number" || sale.sale_price < 0
		|| typeof (sale.sale_location) !== "string") {
		throw ("Invalid Data.");
	}

	let appIncentive = incentives.find(incentive => {
		if (typeof (incentive) !== "object" || (incentive.min_sales && (typeof (incentive.min_sales) !== "number" || incentive.min_sales < 0))
			|| (incentive.location && typeof (incentive.location) !== "string")
			|| typeof (incentive.type) !== "string") {
			throw ("Invalid Data.");
		}

		return incentive.type.toLowerCase() === "location_sales"
			&& incentive.location.toLowerCase() === sale.sale_location.toLowerCase()
			&& sale.sale_price >= incentive.min_sales;
	});

	return calculateCommission(sale.sale_price, appIncentive);
};

//Function to calculate incentive for brand based incentives
const calculateBrandIncentive = (sale, incentives, cars) => {
	if (!sale || !incentives || !cars || typeof (sale) !== "object" || typeof (incentives) !== "object" || typeof (cars) !== "object"
		|| typeof (sale.car_id) !== "string") {
		throw ("Invalid Data.");
	}

	let carDetail = cars.find(car => {
		if (typeof (car) !== "object" || typeof (car.id) !== "string" || typeof (car.brand) !== "string") {
			throw ("Invalid Data.");
		}

		return car.id === sale.car_id;
	});

	if (!carDetail) {
		throw ("Invalid Data.");
	}

	let appIncentive = incentives.find(incentive => {
		if (typeof (incentive) !== "object" || typeof (incentive.type) !== "string") {
			throw ("Invalid Data.");
		}

		if (incentive.type === "car_brand_sales") {
			if (typeof (incentive.car_brand) !== "string") {
				throw ("Invalid Data.");
			}

			return incentive.car_brand.toLowerCase() === carDetail.brand.toLowerCase();
		}
	});

	return calculateCommission(sale.sale_price, appIncentive);
};

//Function to calculate incentive for car's condition based incentives
const calculateConditionIncentive = (sale, incentives, cars) => {
	if (!sale || !incentives || !cars || typeof (sale) !== "object" || typeof (incentives) !== "object" || typeof (cars) !== "object"
		|| typeof (sale.car_id) !== "string") {
		throw ("Invalid Data.");
	}

	let carDetail = cars.find(element => {
		if (typeof (element) !== "object" || typeof (element.id) !== "string" || typeof (element.condition) !== "string") {
			throw ("Invalid Data.");
		}

		return element.id === sale.car_id
	});

	let appIncentive = incentives.find(incentive => {
		if (typeof (incentive) !== "object" || typeof (incentive.type) !== "string") {
			throw ("Invalid Data.");
		}

		if (incentive.type === "car_condition_sales") {
			if (typeof (incentive.condition) !== "string") {
				throw ("Invalid Data.");
			}

			return incentive.condition.toLowerCase() === carDetail.condition.toLowerCase();
		}
	});

	return calculateCommission(sale.sale_price, appIncentive);
};

//Function to calculate incentive for sale date based incentives
const calculateDatesSalesIncentive = (sale, incentives) => {
	if (!sale || !incentives || typeof (sale) !== "object"
		|| typeof (incentives) !== "object" || typeof (sale.sold_on) !== "string") {
		throw ("Invalid Data.");
	}

	let appIncentive = incentives.find(incentive => {
		if (typeof (incentive) !== "object" || typeof (incentive.type) !== "string") {
			throw ("Invalid Data.");
		}

		if (incentive.type === "sale_period") {
			if (typeof (incentive.start_date) !== "string"
				|| typeof (incentive.end_date) !== "string") {
				throw ("Invalid Data.");
			}

			//converting all dates to MM-DD-YYYY format.
			let sale_start_parts = incentive.start_date.split("-");
			let sale_end_parts = incentive.end_date.split("-");
			let sale_date_parts = sale.sold_on.split("-");
			let sale_start = new Date((sale_start_parts[1] + "-" + sale_start_parts[0] + "-" + sale_start_parts[2]));
			let sale_end = new Date((sale_end_parts[1] + "-" + sale_end_parts[0] + "-" + sale_end_parts[2]));
			let sale_date = new Date((sale_date_parts[1] + "-" + sale_date_parts[0] + "-" + sale_date_parts[2]));
			if (isNaN(sale_start.getDate())
				|| isNaN(sale_end.getDate())
				|| isNaN(sale_date.getDate())) {
				throw ("Invalid Data.");
			}

			return (sale_start <= sale_date) && (sale_date <= sale_end); //comparing sale date to start and end date of incentive.
		}
	});

	return calculateCommission(sale.sale_price, appIncentive);
};

//Function to calculate total commission based on incentive percentage
const calculateCommission = (sale_price, appIncentive) => {
	if (appIncentive) {
		if (typeof (appIncentive) !== "object" || appIncentive.commission_percentage < 0
			|| typeof (appIncentive.commission_percentage) !== "number"
			|| typeof (sale_price) !== "number" || sale_price < 0) {
			throw ("Invalid Data.");
		}

		return sale_price * (appIncentive.commission_percentage / 100);
	} else {
		return 0;
	}
};

//Function for saving data in CSV
const saveData = (data) => {
	try {
		data.unshift(["Salesman Id", "Name", "Total Incentive"]);
		let csvData = (data.map(element => element.join(",") + "\r\n")).join("");
		fs.writeFileSync("Incentives.csv", csvData, "utf-8");
		return true;
	} catch (err) {
		throw ("Invalid Data.");
	}
};

try {
	let finalIncentives = salesmenData.map(salesman => [salesman.id, salesman.name, 0]);
	salesData.forEach(sale => {
		let totalIncentive = calculateLocationIncentive(sale, incentivesData)
			+ calculateBrandIncentive(sale, incentivesData, carsData)
			+ calculateConditionIncentive(sale, incentivesData, carsData)
			+ calculateDatesSalesIncentive(sale, incentivesData);

		finalIncentives[finalIncentives.findIndex(element => element[0] === sale.salesman_id)][2] += totalIncentive;
	});

	saveData(finalIncentives);
} catch (err) {
}

module.exports = {
	calculateLocationIncentive,
	calculateBrandIncentive,
	calculateConditionIncentive,
	calculateDatesSalesIncentive,
	calculateCommission,
	saveData
}