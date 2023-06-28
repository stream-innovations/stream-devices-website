import { Controller, RegisterOptions, ValidationRule, useFormContext } from 'react-hook-form';
import { FunctionComponent, useEffect } from 'preact/compat';
import InputCore, { BaseInputProps } from './core';


export type TInputProps = BaseInputProps & Omit<RegisterOptions, 'validate' | 'required'> & {
  required?: ValidationRule<boolean>;
};

const Input: FunctionComponent<TInputProps> = (
  (
    {
      rules,
      value,
      validator,
      ...props
    },
  ) => {
    const controller = useFormContext();

    useEffect(() => {
      if (value !== undefined && value !== null && controller && props.name) {
        controller.setValue(props.name, value, { shouldValidate: true });
      }
    }, [value]);

    if (!controller) {
      return <InputCore value={value} {...props} />
    }

    return (
      <>
        <Controller
          defaultValue=''
          control={controller.control}
          name={props.name || ''}
          rules={{ ...rules, ...props, validate: validator }}
          render={({ field, fieldState: { error } }) => (
            <InputCore error={error} {...field} {...props} value={value} rules={rules} /> as any
          )} />
      </>
    );
  }
);
Input.displayName = 'Input';

export default Input;