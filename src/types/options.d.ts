interface OptionsProps {
  name:string;
  mode: 'onBlur' | 'onChange' | 'onSubmit';
  reValidateMode:  'onBlur' | 'onChange' | 'onSubmit';
  defaultValues: {[key:string]: any};
  resolver: string;
  delayError: number;
}

export type Options<Partial> =OptionsProps