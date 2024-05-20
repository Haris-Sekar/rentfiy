import {
	Box,
	Fab,
	Paper,
	Skeleton,
	Stack,
	TablePagination,
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import PropertyCard from "./PropertyCard";
import { fetchProperties } from "../store/Reducers/PropertyReducers";

const Sell = () => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			fetchProperties({
				page: page,
				perPage: rowsPerPage,
				isSell: true,
			})
		);
	}, []);

	const { properties, loading, totalProperties } = useAppSelector(
		(state) => state.property
	);

	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
		dispatch(
			fetchProperties({
				page: page,
				perPage: rowsPerPage,
				isSell: true,
			})
		);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		handleChangePage(null, 0);
	};

	const navigate = useNavigate();

	return (
		<div>
			<Fab
				sx={{ position: "absolute", right: 25 }}
				variant="extended"
				color="primary"
				onClick={() => {
					navigate("./add");
				}}
			>
				<AddIcon sx={{ mr: 1 }} />
				Add Property
			</Fab>
			<Paper sx={{ pt: "5%", pl: "2%" }}>
				{loading ? (
					<Box sx={{ display: "flex" }}>
						{[1, 2, 3, 4].map((e) => (
							<Stack spacing={2} sx={{ m: "1%" }}>
								<Skeleton variant="rounded" width={210} height={40} />
								<Skeleton variant="rounded" width={210} height={220} />
								<Skeleton variant="rounded" width={210} height={120} />
							</Stack>
						))}
					</Box>
				) : (
					properties?.length > 0 && (
						<Box sx={{ display: "flex" }}>
							{properties.map((property) => (
								<PropertyCard
									id={property._id}
									title={property.title}
									ownerName={property.addedUserId.firstName}
									amount={property.amount}
									bhk={property.bhk}
									buildUp={property.buildUp}
									deposit={property.deposit}
									description={property.description}
									floor={property.floor}
									furnishing={property.furnishing}
									likes={property.likes}
									location={property.location}
									preferredTenants={property.preferredTenants}
									propertyType={property.propertyType}
									rentType={property.rentType}
								/>
							))}
						</Box>
					)
				)}

				<TablePagination
					component="div"
					count={totalProperties}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[10, 20]}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default Sell;
