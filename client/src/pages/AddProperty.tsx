import {
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from "@mui/material";
import { IAddProperty } from "../Types/Property";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { addProperty } from "../api/services/property";
import { toast } from "react-hot-toast";

const AddProperty = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddProperty>();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	function onError() {}

	async function onSubmit(property: IAddProperty) {
		setIsLoading(true);

		try {
			await addProperty(property);
			toast("Propety added successfully!");
			navigate("/app/sell");
		} catch (error) {
			setIsLoading(false);
		}
	}

	return (
		<div>
			<Container>
				<Grid item sx={{ mt: 5 }}>
					<Controller
						name="title"
						control={control}
						defaultValue=""
						rules={{
							required: "Property Title is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label="Property Title"
								fullWidth
								required
								error={Boolean(errors.title)}
								helperText={errors.title?.message}
								autoComplete="given-name"
							/>
						)}
					/>
				</Grid>
				<Grid item sx={{ mt: 5 }}>
					<Controller
						name="description"
						control={control}
						defaultValue=""
						rules={{
							required: "Property Description is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label="Property Description"
								fullWidth
								required
								error={Boolean(errors.description)}
								helperText={errors.description?.message}
								autoComplete="given-name"
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}
				>
					<Controller
						name="location"
						control={control}
						defaultValue=""
						rules={{
							required: "Location is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label="Location"
								required
								sx={{ width: "48%" }}
								error={Boolean(errors.location)}
								helperText={errors.location?.message}
								autoComplete="given-name"
							/>
						)}
					/>
					<Controller
						name="bhk"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								label="Number of BHK/RK"
								required
								sx={{ width: "48%" }}
								error={Boolean(errors.bhk)}
								helperText="Please mention BHK or RK"
								autoComplete="given-name"
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}
				>
					<Controller
						name="rentType"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label">
									Property Ad Type
								</FormLabel>
								<RadioGroup
									{...field}
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
								>
									<FormControlLabel
										value={0}
										control={<Radio />}
										label="Rent"
									/>
									<FormControlLabel
										value={1}
										control={<Radio />}
										label="Resale"
									/>
									<FormControlLabel
										value={2}
										control={<Radio />}
										label="Lease"
									/>
								</RadioGroup>
							</FormControl>
						)}
					/>
					<Controller
						name="amount"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<TextField
								{...field}
								label="Amount for the Property"
								required
								sx={{ width: "48%" }}
								error={Boolean(errors.amount)}
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">₹</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}
				>
					<Controller
						name="deposit"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<TextField
								{...field}
								label="Deposit for the Property"
								required
								sx={{ width: "48%" }}
								error={Boolean(errors.deposit)}
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">₹</InputAdornment>
									),
								}}
							/>
						)}
					/>
					<Controller
						name="buildUp"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<TextField
								{...field}
								label="Build up for the Property"
								required
								sx={{ width: "48%" }}
								error={Boolean(errors.buildUp)}
								type="number"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">sqft</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}
				>
					<Controller
						name="furnishing"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label">
									Furnishing Type
								</FormLabel>
								<RadioGroup
									{...field}
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
								>
									<FormControlLabel
										value={0}
										control={<Radio />}
										label="Full"
									/>
									<FormControlLabel
										value={1}
										control={<Radio />}
										label="Semi"
									/>
									<FormControlLabel
										value={2}
										control={<Radio />}
										label="None"
									/>
								</RadioGroup>
							</FormControl>
						)}
					/>
					<Controller
						name="propertyType"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<FormControl sx={{ width: "48%" }}>
								<InputLabel id="demo-simple-select-label">
									Property Type
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Property Type"
									{...field}
								>
									<MenuItem value={0}>Apartment</MenuItem>
									<MenuItem value={1}>Independent House/Villa</MenuItem>
									<MenuItem value={2}>Gated Community Villa</MenuItem>
								</Select>
							</FormControl>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}
				>
					<Controller
						name="preferredTenants"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label">
									Preferred Tenants
								</FormLabel>
								<RadioGroup
									{...field}
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
								>
									<FormControlLabel
										value={0}
										control={<Radio />}
										label="Family"
									/>
									<FormControlLabel
										value={1}
										control={<Radio />}
										label="Company"
									/>
									<FormControlLabel
										value={2}
										control={<Radio />}
										label="Bachelor Male"
									/>
									<FormControlLabel
										value={3}
										control={<Radio />}
										label="Bachelor Female"
									/>
								</RadioGroup>
							</FormControl>
						)}
					/>
					<Controller
						name="floor"
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<TextField
								{...field}
								label="Floor number"
								required
								sx={{ width: "48%" }}
								error={Boolean(errors.floor)}
								type="number"
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{ mt: 5, display: "flex", justifyContent: "space-around" }}
				>
					<LoadingButton
						startIcon={<AddIcon />}
						variant="contained"
						sx={{
							width: "30%",
							borderRadius: "15px",
							height: "40px",
							textTransform: "capitalize",
							fontSize: "17px",
							fontWeight: "bolder",
						}}
						loading={isLoading}
						color="info"
						onClick={handleSubmit(onSubmit, onError)}
					>
						Post!
					</LoadingButton>
					<LoadingButton
						startIcon={<CloseIcon />}
						variant="outlined"
						sx={{
							width: "30%",
							borderRadius: "15px",
							height: "40px",
							textTransform: "capitalize",
							fontSize: "17px",
							fontWeight: "bolder",
						}}
						color="error"
						onClick={() => {
							navigate("/app/sell");
						}}
					>
						Cancle
					</LoadingButton>
				</Grid>
			</Container>
		</div>
	);
};

export default AddProperty;
