import React, { useEffect, useRef } from 'react';

export interface OutsideClickProps {
  onClickOutside: () => void;
  children: (props: { ref: React.Ref<HTMLElement> }) => React.ReactNode;
}

export const OutsideClick = ({
  children,
  onClickOutside,
}: OutsideClickProps) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const clickHandler = (ev: MouseEvent) => {
      if (element && !element.contains(ev.target as Node)) {
        onClickOutside();
      }
    };

    if (element && typeof document !== 'undefined') {
      document.addEventListener('click', clickHandler);
    }

    return () => {
      if (element && typeof document !== 'undefined') {
        document.removeEventListener('click', clickHandler);
      }
    };
  }, [onClickOutside]);

  return <>{children({ ref: elementRef })}</>;
};
