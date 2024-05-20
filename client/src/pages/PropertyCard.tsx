import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import houseImg from "../assets/house.jpeg";
import {
	FurnishingType,
	PreferredTenants,
	PropertyType,
	RentType,
	currencyFormatter,
} from "../Types/Property";
import { Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendMail } from "../api/services/property";

interface IPropertyCard {
	ownerName: String;
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
	bhk: String;
	likes: number;
	id: string;
}

const PropertyCard = (props: IPropertyCard) => {
	const navigate = useNavigate();
	function handleGetOwnerDetails(id: string) {
		if (localStorage.getItem("token") !== null) {
			sendMail(id);
		} else {
			navigate("/auth");
		}
	}

	return (
		<Card sx={{ maxWidth: 345, m: "2%" }}>
			<CardHeader title={props.title} subheader={props.location} />
			<Chip
				label={props.bhk}
				sx={{ fontSize: "17px", fontWeight: "bolder", m: "2%" }}
			/>
			<Chip
				label={props.buildUp + " sqft"}
				sx={{ fontSize: "17px", fontWeight: "bolder", m: "2%" }}
			/>
			<CardMedia component="img" height="194" image={houseImg} alt="House" />
			<CardContent>
				<Typography variant="body1">{props.description}</Typography>
				<Typography
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{RentType(props.rentType)} Amount :{" "}
					<Typography variant="h5">
						{currencyFormatter(props.amount)}
					</Typography>
				</Typography>
				<Typography
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{" "}
					Deposit :{" "}
					<Typography variant="h6">
						{currencyFormatter(props.deposit)}
					</Typography>
				</Typography>
				<Typography
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{" "}
					Floor : <Typography variant="h5">{props.floor}</Typography>
				</Typography>
				<Typography
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{" "}
					Furnishing :{" "}
					<Typography variant="h6">
						{" " + FurnishingType(props.furnishing)}
					</Typography>
				</Typography>
				<Typography
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{" "}
					Preferred Tenants :{" "}
					<Typography variant="h6">
						{" " + PreferredTenants(props.preferredTenants)}
					</Typography>
				</Typography>
				<Typography
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{" "}
					Property Type :{" "}
					<Typography variant="h6">
						{" " + PropertyType(props.propertyType)}
					</Typography>
				</Typography>
				<CardActions>
					<Button
						variant="contained"
						sx={{ borderRadius: "15px" }}
						fullWidth
						onClick={(_e) => handleGetOwnerDetails(props.id)}
					>
						Get Owner Details
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
};

export default PropertyCard;
