import React, { useState, useCallback, useMemo } from 'react';

import { StylableComponentProps } from '@app/types';

import FormContext from './formContext';

export interface FormProps<TSubmitData> extends StylableComponentProps {
  onSubmit: (data: TSubmitData) => void;
  onChange?: (data: Partial<TSubmitData>) => Partial<TSubmitData>;
  children: React.ReactNode;
}

export function Form<TSubmitData extends { [key: string]: string } = {}>({
  children,
  onChange,
  onSubmit,
  ...styleProps
}: FormProps<TSubmitData>) {
  const [formData, setFormData] = useState<Partial<TSubmitData>>({});
  const setFieldValue = useCallback(
    (fieldName: keyof TSubmitData, value: string) => {
      const updatedData = {
        ...formData,
        [fieldName]: value,
      };
      setFormData(updatedData);
    },
    [formData]
  );
  const submitHandler = (ev: React.FormEvent) => {
    ev.preventDefault();

    onSubmit(formData as TSubmitData);
  };

  return (
    <FormContext.Provider
      value={useMemo(
        () => ({
          data: formData,
          setFieldValue,
        }),
        [setFieldValue, formData]
      )}
    >
      <form onSubmit={submitHandler} {...styleProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
}