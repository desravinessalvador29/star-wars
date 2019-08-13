import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";

export class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
	render() {
		return (
			<nav className="navbar navbar-light bg-light mb-3 h-23">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">StarWars</span>
				</Link>
				<div className="ml-auto">
					<Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
						<DropdownToggle caret>Favorite</DropdownToggle>
						<DropdownMenu>
							<Context.Consumer>
								{({ store, actions }) => {
									return store.favorite.map((item, index) => {
										return (
											<DropdownItem key={index} header>
												<span>{item.name}</span>

												<button
													className="float-right"
													onClick={() => actions.removeFavorites(item, index)}>
													<i className="fas fa-trash-alt" />
												</button>
											</DropdownItem>
										);
									});
								}}
							</Context.Consumer>
						</DropdownMenu>
					</Dropdown>
				</div>
			</nav>
		);
	}
}
