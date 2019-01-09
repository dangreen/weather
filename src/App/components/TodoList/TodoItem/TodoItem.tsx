import React, {
	FormEvent,
	ChangeEvent,
	PureComponent
} from 'react';
import stylesheet from './TodoItem.st.css';

interface IProps {
	value: string;
	onSubmit?(value: string);
	onDelete?();
}

interface IState {
	originalValue: string;
	value: string;
}

export default class TodoItem extends PureComponent<IProps, IState> {

	static getDerivedStateFromProps(
		{ value }: IProps,
		{ originalValue: prevOriginalValue }: IState
	) {

		if (value !== prevOriginalValue) {
			return {
				originalValue: value,
				value
			};
		}

		return null;
	}

	constructor(props) {

		super(props);

		const value = this.props.value || '';

		this.state = {
			originalValue: value,
			value
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {

		const {
			originalValue,
			value
		} = this.state;
		const valueWasChanged = value !== originalValue;

		return (
			<form
				onSubmit={this.onSubmit}
				{...stylesheet('root', {}, this.props)}
			>
				<input
					{...stylesheet('input')}
					type='text'
					onChange={this.onChange}
					value={value}
				/>
				{valueWasChanged && (
					<button
						{...stylesheet('button')}
					>
						Save
					</button>
				)}
				<button
					{...stylesheet('button')}
					type='button'
					onClick={this.onDelete}
				>
					delete
				</button>
			</form>
		);
	}

	onSubmit(event: FormEvent) {

		event.preventDefault();

		const {
			onSubmit
		} = this.props;
		const {
			value
		} = this.state;

		if (typeof onSubmit === 'function') {
			onSubmit(value);
		}
	}

	onDelete() {

		const {
			onDelete
		} = this.props;

		if (typeof onDelete === 'function') {
			onDelete();
		}
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			value: nextValue
		} = event.target;

		this.setState(() => ({
			value: nextValue
		}));
	}
}
