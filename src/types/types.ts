import { MouseEventHandler } from "react";

export interface ControllerProps {
	render: string;
}

export interface ErrorMessageProps {
	error: string;
}

export interface OptionsProps {
	name: string;
	mode: "onBlur" | "onChange" | "onSubmit";
	reValidateMode: "onBlur" | "onChange" | "onSubmit";
	defaultValues: { [key: string]: any };
	resolver: string;
	delayError: number;
}

export type ButtonType = {
	label: string;
	size?: "lg" | "md" | "sm";
	btnType?: "primary" | "secondary" | "ghost";
	onClick?: MouseEventHandler<HTMLButtonElement>;
	rounded?: "soft" | "hard";
	isActive?: boolean;
	isDisabled?: boolean;
	className?: string;
	styles?: object;
};
