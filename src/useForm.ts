import React from "react";
import { OptionsProps } from "./types/types";

export function useForm(options: OptionsProps) {
	const ref = React.useRef(options.mode);
	const name = options.name;
	const control = (ref: string, name: string) => `USE_FORM: ${name} ${ref}`;

	return control(ref.current, name);
}
