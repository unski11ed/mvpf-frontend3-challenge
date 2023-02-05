import React, { PropsWithChildren, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import defaultTheme from '@app/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  authenticated?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export function renderWithProviders(
  ui: React.ReactElement,
  { ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
    );

    return (
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    );
  }

  return {
    wrapper: Wrapper,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
