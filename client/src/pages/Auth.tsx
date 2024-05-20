import { Controller, useForm } from "react-hook-form";
import { User } from "../Types/User";
import LoadingButton from "@mui/lab/LoadingButton";

import { Box } from "@mui/system";
import {
	Grid,
	Paper,
	TextField,
	Typography,
	InputAdornment,
	IconButton,
} from "@mui/material";
import "./Auth.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api/services/auth.ts";
import { populateUserDetails } from "../store/Reducers/UserReducers.ts";
import { useDispatch } from "react-redux";
const Auth = () => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<User>();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const jwtToken = localStorage.getItem("token");
	useEffect(() => {
		if (jwtToken) {
			navigate("/app/rent");
		}
	}, [navigate]);

	async function onSubmit(e: User) {
		setIsLoading(true);
		if (e.password.length < 6) {
			setError("password", {
				type: "minLength",
				message: "Passsword length should be greated than 6",
			});
		}
		const validateEmail = (email: any) => {
			return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		};
		if (!validateEmail(e.email)) {
			setError("email", {
				type: "minLength",
				message: "Enter an valid email address",
			});
		}
		try {
			let data = null;
			if (isRegister) {
				data = await signup(e);
			} else {
				data = await login(e);
			}
			const userDetails: User = data.user as User;
			dispatch(populateUserDetails(userDetails));
			localStorage.setItem("token", data.token);
			localStorage.setItem("user_details", JSON.stringify(userDetails));
			setIsLoading(false);
			navigate("/rent");
		} catch (error) {
			setIsLoading(false);
		}
	}

	function onError() {}
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((show) => !show);
	};

	const [isRegister, setIsRegister] = useState(true);

	return (
		<Box
			height="100vh"
			sx={{ alignItems: "center", justifyContent: "center" }}
			display="flex"
		>
			<Paper className="authContainer" sx={{ borderRadius: 10 }} elevation={4}>
				<div className="logo"></div>
				<Typography
					variant="h5"
					sx={{ mt: 5, fontWeight: "bold" }}
					color="primary"
				>
					{isRegister
						? "Hi, Sign up to begin your journey with Rentfiy"
						: "Hi, Welcome back!"}
				</Typography>
				<hr style={{ width: "50%" }} />
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit, onError)}
					sx={{
						mt: 3,
						width: "60%",
						display: "flex",
						flexDirection: "column",
						gap: "20px",
					}}
				>
					{" "}
					{!isRegister && (
						<Typography
							sx={{
								m: 1,
								textAlign: "center",
								fontSize: "15px",
								fontWeight: 500,
							}}
						>
							Sign in with your email
						</Typography>
					)}
					{isRegister && (
						<>
							<Grid item>
								<Controller
									name="firstName"
									control={control}
									defaultValue=""
									rules={{
										required: "first name is required",
									}}
									render={({ field }) => (
										<TextField
											{...field}
											label="First Name"
											fullWidth
											required
											error={Boolean(errors.firstName)}
											helperText={errors.firstName?.message}
											autoComplete="given-name"
										/>
									)}
								/>
							</Grid>
							<Grid item>
								<Controller
									name="lastName"
									control={control}
									defaultValue=""
									render={({ field }) => (
										<TextField
											{...field}
											label="Last Name"
											fullWidth
											error={Boolean(errors.lastName)}
											helperText={errors.lastName?.message}
											autoComplete="given-name"
										/>
									)}
								/>
							</Grid>
						</>
					)}
					<Grid item>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							rules={{
								required: "Email is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="Email"
									fullWidth
									error={Boolean(errors.email)}
									helperText={errors.email?.message}
									autoComplete="given-name"
								/>
							)}
						/>
					</Grid>
					{isRegister && (
						<Grid item>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue=""
								rules={{
									required: "Phone number is required",
								}}
								render={({ field }) => (
									<TextField
										{...field}
										label="Phone Number"
										fullWidth
										type="number"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">+91</InputAdornment>
											),
										}}
										error={Boolean(errors.firstName)}
										helperText={errors.firstName?.message}
										autoComplete="given-name"
									/>
								)}
							/>
						</Grid>
					)}
					<Grid item>
						<Controller
							name="password"
							control={control}
							defaultValue=""
							rules={{
								required: "Password is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="Password"
									fullWidth
									error={Boolean(errors.password)}
									helperText={errors.password?.message}
									autoComplete="given-name"
									type={showPassword ? "text" : "password"}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													edge="end"
												>
													{!showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Grid>
					{!isRegister && (
						<Typography
							color="primary"
							fontWeight="bold"
							textAlign="end"
							sx={{ textDecoration: "underline", cursor: "pointer" }}
						>
							Forgot Password
						</Typography>
					)}
					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						loading={isLoading}
					>
						{isRegister ? "Sign Up" : "Sign In"}
					</LoadingButton>
					{isRegister ? (
						<Typography>
							Already have an account ?{" "}
							<span
								style={{ color: "#1976d2", cursor: "pointer" }}
								onClick={(_e) => setIsRegister(false)}
							>
								Login now!
							</span>
						</Typography>
					) : (
						<Typography>
							Don't have an account ?{" "}
							<span
								style={{ color: "#1976d2", cursor: "pointer" }}
								onClick={(_e) => setIsRegister(true)}
							>
								Sign up now!
							</span>
						</Typography>
					)}
				</Box>
			</Paper>
		</Box>
	);
};

export default Auth;
