import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box } from '../box';

const DateInputWrap = styled(Box)`
  display: inline-block;
  position: relative;
`;

const DateInputNative = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;

  ::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;

const DateInputMask = styled(Box)(
  ({ theme }) => `
  position: relative;
  z-index: 1;
  color: ${theme.components.dateInput.color};
  background-color: ${theme.components.dateInput.background};
  border-radius: ${theme.components.dateInput.radius};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.components.dateInput.paddingY} ${theme.components.dateInput.paddingX};
  pointer-events: none;
  font-size: ${theme.components.dateInput.fontSize};

  ::after {
    content: '';
    background-image: url(/icon-calendar.svg);
    width: 11px;
    height: 12px;
    margin-left: ${theme.components.dateInput.paddingX};
  }
`
);

export interface DateInputProps extends StylableComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  selectedTemplate?: (value: string) => string;
  format?: string;
  minDate?: string;
  maxDate?: string;
}

export const DateInput = ({
  value,
  onChange,
  placeholder,
  selectedTemplate,
  minDate,
  maxDate,
  ...styleProps
}: DateInputProps) => {
  const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(ev.target.value);
  };

  return (
    <DateInputWrap {...styleProps}>
      <DateInputNative
        type="date"
        min={minDate}
        max={maxDate}
        value={value}
        onChange={changeHandler}
      />
      <DateInputMask>
        {value
          ? (selectedTemplate as (value: string) => string)(value)
          : placeholder}
      </DateInputMask>
    </DateInputWrap>
  );
};
DateInput.defaultProps = {
  placeholder: 'Select date...',
  selectedTemplate: (value: string) => `Selected: ${value}`,
};
