import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FieldComponentProps, StylableComponentProps } from '@app/types';
import { Box } from '../box';
import { UnstyledButton } from '../unstyledButton';
import { OutsideClick } from '../outsideClick';

const SelectWrap = styled(Box)`
  position: relative;
  display: inline-flex;
  font-size: ${({ theme }) => theme.components.select.fontSize};
`;

const SelectTrigger = styled(UnstyledButton)(
  ({ theme }) => `
  background: ${theme.components.select.background};
  border-radius: ${theme.components.select.menuRadius};
  color: ${theme.components.select.color};
  min-width: ${theme.components.select.menuMinWidth};
  text-align: left;
  padding: calc(2 * ${theme.components.select.menuItemPaddingY}) ${theme.components.select.menuItemPaddingX};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::after {
    content: '';
    background-image: url(/icon-select-arrow.svg);
    width: 14px;
    height: 11px;
    margin-left: ${theme.components.select.menuItemPaddingX};
  }
`
);

const NativeSelect = styled.select`
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
`;

// TODO: top below
const SelectCustomList = styled(Box)(
  ({ theme }) => `
  position: absolute;
  left: 0;
  top: 35px;
  min-width: ${theme.components.select.menuMinWidth};
  border-radius: ${theme.components.select.menuRadius};
  background-color: ${theme.components.select.background};
  padding-top: ${theme.components.select.menuItemPaddingY};
  padding-bottom: ${theme.components.select.menuItemPaddingY};
  z-index: 2;
`
);

const SelectCustomListItem = styled(UnstyledButton)<{ active?: boolean }>(
  ({ theme, active }) => `
  padding: ${theme.components.select.menuItemPaddingY} ${
    theme.components.select.menuItemPaddingX
  };
  color: ${theme.components.select.color};
  font-weight: ${active ? 'bold' : 'normal'};
  background: ${theme.components.select.background};
  display: block;
  width: 100%;
  text-align: left;

  :focus,
  :hover {
    color: ${theme.components.select.colorFocus};
  }
`
);

export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps
  extends StylableComponentProps,
    FieldComponentProps {
  children: React.ReactNode;
}

export const Select = ({
  children,
  value,
  onChange,
  name,
  ...styleProps
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = React.Children.toArray(children)
    .filter<React.ReactElement<React.HTMLProps<HTMLOptionElement>>>(
      React.isValidElement
    )
    .map<SelectOption>((child) => ({
      label: child.props.children as string,
      value: (child.props.value as string) ?? null,
    }));

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);

    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <OutsideClick
      onClickOutside={() => {
        setIsOpen(false);
      }}
    >
      {({ ref }) => (
        <SelectWrap {...styleProps} ref={ref as React.Ref<HTMLDivElement>}>
          {/* Fallback to native select for mobile devices */}
          <NativeSelect
            value={value ?? ''}
            onChange={(ev) => handleChange(ev.target.value ?? null)}
            name={name}
          >
            {children}
          </NativeSelect>

          <SelectTrigger onClick={toggleList}>
            {selectedOption?.label}
          </SelectTrigger>

          {isOpen && (
            <SelectCustomList>
              {options.map((option) => (
                <SelectCustomListItem
                  key={option.value}
                  onClick={() => {
                    handleChange(option.value);
                  }}
                  active={selectedOption?.value === option.value}
                >
                  {option.label}
                </SelectCustomListItem>
              ))}
            </SelectCustomList>
          )}
        </SelectWrap>
      )}
    </OutsideClick>
  );
};
