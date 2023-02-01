import { createContext } from 'react';

export interface FormContextProps {
  data: { [field: string]: string | undefined };
  setFieldValue: (fieldName: string, value: string) => void;
}

const FormContext = createContext<FormContextProps>({
  data: {},
  setFieldValue() {
    throw new TypeError('Unimplemented context method');
  },
});

export default FormContext;
