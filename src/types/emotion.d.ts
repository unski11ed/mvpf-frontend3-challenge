import '@emotion/react';

import type { AppTheme } from '@app/theme';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
