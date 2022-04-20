import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import { ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Login extends Component {
	state = {
		account: {
			email: "",
			password: "",
		},
	};

	componentDidMount() {
		if (localStorage.getItem("ecom-logged") === "true") {
			const account = { ...this.state.account };
			this.setState({ account });
			// redirect here
			window.location.href = "http://localhost:3000/ecomHome";
		}
	}

	handleChange = e => {
		const account = { ...this.state.account };
		account[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ account });
	};

	handleSubmit = e => {
		e.preventDefault();
		const data = {
			email: this.state.account.email,
			password: this.state.account.password,
		};
		axios
			.post("http://localhost:3001/login", data)
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					localStorage.setItem("ecom-logged", true);
					toast(`Login successfull`);
					window.location.href = "http://localhost:3000/ecomHome";
				}
			})
			.catch(err => {
				let account = { ...this.state.account };
				account.email = "";
				account.password = "";
				this.setState({ account });
				toast(`Login Failed`);
			});
	};

	render() {
		return (
			<>
				<ToastContainer></ToastContainer>
				<div className="login-whole">
					{/* <div className="left-img-login">
						<img src="./login.png" className="login"></img>
					</div> */}
					<form className="login-form">
						<div className="login-title">Alkazar </div>
						<div className="email-login">Email</div>
						<input
							name="email"
							type="mail"
							className="input-email-login"
							value={this.state.account.email}
							onChange={this.handleChange}
						></input>
						<div className="password-login">Password</div>
						<input
							name="password"
							className="input-password-login"
							type="password"
							value={this.state.account.password}
							onChange={this.handleChange}
						></input>
						<div className="btns-login-flex">
							<div
								type="submit"
								onClick={this.handleSubmit}
								className="login-btn"
							>
								Login
							</div>
						</div>

						<Link to="/signup" style={{ textDecoration: "none" }}>
							{" "}
							<div className="dont-account">Don't Have An Acoount ?</div>
						</Link>
					</form>
				</div>
			</>
		);
	}
}

export default Login;
