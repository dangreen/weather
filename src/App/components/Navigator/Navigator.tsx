import React, {
	Children,
	Component
} from 'react';
import {
	style,
	classes
} from './Navigator.st.css';

export interface IProps {
	className?: string;
}

export default class Navigator extends Component<IProps> {

	render() {

		const {
			className,
			children
		} = this.props;

		return (
			<nav
				className={style(classes.root, className)}
			>
				<ul
					className={classes.list}
				>
					{Children.map(children, child => child && (
						<li
							className={classes.item}
						>
							{child}
						</li>
					))}
				</ul>
			</nav>
		);
	}
}
