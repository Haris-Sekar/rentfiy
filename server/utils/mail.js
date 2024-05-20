import nodemailer from "nodemailer";

export const sendMail = async (
	email,
	name,
	userDetails,
	propertyDetails,
	isOwnerMail
) => {
	const htmlContent = `<html> <body> <div style="width:600px; font-family: Helvetica, Arial, sans-serif;"> <div style="padding: 10px; color: rgba(255, 255, 255, 0.75); background-color:#e6e6e6;"> <div style="background-color: #fff; color:#444; padding:20px 40px; font-weight: 400; font-size:15px; text-align:justify;"> <h3 style="font-weight: 400;">Dear ${name},<h3><br> <h3 style="font-weight: 500; letter-spacing: 0.9px;">${
		isOwnerMail ? "Tent Details" : "Owner Details"
	} for ${
		propertyDetails.title
	} </h3> <h4 style="font-weight: 500; letter-spacing: 0.9px;">${
		propertyDetails.bhk
	}</h4> <table style="color:#444;"> <tr style="border: 1px solid #b2b2b2;"> <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Email ID</td> <td style="background-color: #fff;padding: 6px;width: 240px;">${
		userDetails.email
	}</td> </tr> <tr style="border: 1px solid #b2b2b2;"> <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Phone Number</td> <td style="background-color: #fff;padding: 6px;width: 240px;">${
		userDetails.phoneNumber
	} </td> </tr> </table> </div> </div> </div> </body> </html>`;
	var mailOptions = {
		from: process.env.EMAILUSER,
		to: email,
		subject: `${propertyDetails.title} - ${propertyDetails.bhk} - Owner Details`,
		html: htmlContent,
	};
	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAILUSER,
			pass: process.env.EMAILPASSWORD,
		},
	});

	const resp = await transporter.sendMail(mailOptions);
	return {
		message: "Mail sent",
		code: 200,
	};
};
