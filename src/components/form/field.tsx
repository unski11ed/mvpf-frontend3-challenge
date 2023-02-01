import React, { useContext } from 'react';

import { FieldComponentProps } from '@app/types';

import FormContext from './formContext';

export interface FieldProps {
  name: string;
  children: (props: FieldComponentProps) => React.ReactNode;
}

export const Field = ({ name, children }: FieldProps) => {
  const { data, setFieldValue } = useContext(FormContext);

  return (
    <>
      {children({
        value: data[name] || '',
        onChange: (value) => setFieldValue(name, value),
        name,
      })}
    </>
  );
};
