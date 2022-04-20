import React, { Component } from "react";
import "./signup.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Signup extends Component {
	state = {
		account: {
			email: "",
			password: "",
			passwordCheck: "",
			name: "",
		},
	};

	handleChange = e => {
		const account = { ...this.state.account };
		account[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ account });
	};

	handleSubmit = e => {
		e.preventDefault();
		if (
			this.state.account.password.length < 6 ||
			this.state.account.passwordCheck !== this.state.account.passwordCheck
		) {
			toast(`password should be at least 6 characters and should match`);
		} else {
			const data = {
				email: this.state.account.email,
				password: this.state.account.password,
				name: this.state.account.name,
			};
			axios
				.post("http://localhost:3001/register", data)
				.then(res => {
					//redirect
					window.location.href = "http://localhost:3000/ecomHome";
					let account = { ...this.state.account };
					account.email = "";
					account.name = "";
					account.password = "";
					account.passwordCheck = "";
					this.setState({ account });
					toast(`Signup successfull`);
				})
				.catch(err => {
					//toast
					let account = { ...this.state.account };
					account.email = "";
					account.name = "";
					account.password = "";
					account.passwordCheck = "";
					this.setState({ account });
					toast(`Account taken`);
				});
		}
	};

	render() {
		return (
			<>
				<ToastContainer></ToastContainer>
				<div className="signup-whole">
					{/* <div className="signup-img">
						<img src="./signup.png" className="signup-left"></img>
					</div> */}
					<form className="signup-form">
						<div className="name-signup">Name</div>
						<input
							name="name"
							value={this.state.account.name}
							onChange={this.handleChange}
							className="input-name-signup"
						></input>
						<div className="email-signup">Email</div>
						<input
							name="email"
							type="mail"
							value={this.state.account.email}
							onChange={this.handleChange}
							className="input-email-signup"
						></input>
						<div className="password-signup">Password</div>
						<input
							name="password"
							type="password"
							value={this.state.account.password}
							onChange={this.handleChange}
							className="input-password-signup"
						></input>
						<div className="confirm-password-signup">Confirm Password</div>
						<input
							name="passwordCheck"
							type="password"
							value={this.state.account.passwordCheck}
							onChange={this.handleChange}
							className="input-confirm-password"
						></input>
						<div
							type="submit"
							onClick={this.handleSubmit}
							className="signup-btn"
						>
							Signup
						</div>
						<Link to="/login" style={{ textDecoration: "none" }}>
							{" "}
							<div className="already-have">Already Have An Account</div>{" "}
						</Link>
					</form>
				</div>
			</>
		);
	}
}

export default Signup;
