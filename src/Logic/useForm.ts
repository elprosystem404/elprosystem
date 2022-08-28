import React from "react";
//import { Options } from "../types/options";

export interface useFormProps {
	name: string;
	mode: "onBlur" | "onChange" | "onSubmit";
	reValidateMode: "onBlur" | "onChange" | "onSubmit";
	defaultValues: { [key: string]: any };
	resolver: string;
	delayError: number;
}
const useForm = (options: useFormProps) => {
	const ref = React.useRef(options.mode);
	const control = (x: useFormProps) => `CONTROL: ${x.name} ${ref.current}`;

	return control(options);
};

export default useForm;
