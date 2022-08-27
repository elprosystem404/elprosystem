import React from "react";
import { Options } from "../types/options";

const useForm = (options: Options<any>) => {
	const ref = React.useRef(options.mode);
	const control = (x: Options<any>) => `CONTROL: ${x.name} ${ref.current}`;

	return control(options);
};

export default useForm;
