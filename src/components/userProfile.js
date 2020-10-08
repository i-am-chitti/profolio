import React, { Component } from "react";
import { user } from "../shared/user";
import "../App.css";

class Profile extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.match.params.username);
		this.state = {};
	}
	render() {
		return (
			<div id="profilePage">
				<div className="back"></div>
				<div id="leader">
					<div id="top">
						<div className="pic">
							<img src={user.picture} alt="Baba yaga" />
						</div>
						<div className="name">{user.name}</div>
						<div className="about">" {user.description} "</div>
					</div>

					<div id="bottom">
						<div className="skills">
							<div className="title">Skills</div>
							<hr className="line"></hr>
							<div className="list">
								<ul>
									<li>Japanese jiu-jitsu</li>
									<li>Tactical three-gun</li>
									<li>Standing Judo</li>
									<li>Kick Ass</li>
									<li>Take names</li>
									<li>Pencil Killing</li>
									<li>Be Cool</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
