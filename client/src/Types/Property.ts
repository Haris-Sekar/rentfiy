import { User } from "./User";

export interface IAddProperty {
	_id: string;
	title: String;
	description: String;
	location: String;
	rentType: number;
	amount: number;
	deposit: number;
	buildUp: number;
	furnishing: number;
	propertyType: number;
	preferredTenants: number;
	floor: number;
	likes: number;
	bhk: String;
	addedUserId: User
}

export function currencyFormatter(number: number): string {
	const formatter = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR'
	});
	return formatter.format(number);
}

export const RentType = (type: number) => {
	switch (type) {
		case 0: return "Rent";
		case 1: return "Resale";
		case 2: return "Lease";
	}

}

export const FurnishingType = (type: number) => {
	switch (type) {
		case 0: return "Full";
		case 1: return "Semi";
		case 2: return "No";
	}

}

export const PropertyType = (type: number) => {
	switch (type) {
		case 0: return "Apartment";
		case 1: return "Independent House/Villa";
		case 2: return "Gated Community Villa";
	}

}

export const PreferredTenants = (type: number) => {
	switch (type) {
		case 0: return "Family"
		case 1: return "Company"
		case 2: return "Bachelor Male"
		case 3: return "Bachelor female"
	}

}