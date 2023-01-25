const baseTheme = {
  scaleFactor: 8,
  palette: {
    white: {
      main: '#FFFFFF',
    },
    blue: {
      main: '#005B96',
      dark: '#011F4B',
      light: '#F1FAFE',
    },
    green: {
      main: '#1BC5BD',
    },
    yellow: {
      main: '#F6CA65',
      dark: '#FFC107',
    },
    gray: {
      light: '#F3F6F9',
      main: '#7E8299',
    },
  },
  typography: {
    fontSize: '16px',
    fontFamily: '"Robot", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  spacing(mul: number = 1) {
    return `${this.scaleFactor * mul}px`;
  },
};

const defaultTheme = {
  ...baseTheme,
  typography: {
    ...baseTheme.typography,
    h1: {
      fontSize: '24px',
      fontWeight: baseTheme.typography.fontWeightBold,
      color: baseTheme.palette.blue.dark,
      lineHeight: '1.167em',
    },
    subtitle: {
      fontWeight: baseTheme.typography.fontWeightBold,
      color: baseTheme.palette.gray.main,
      lineHeight: '1.125em',
    },
    body: {
      fontWeight: baseTheme.typography.fontWeightRegular,
      color: baseTheme.palette.blue.dark,
      lineHeight: '1.125em',
    },
  },
  palette: {
    ...baseTheme.palette,
    background: {
      default: baseTheme.palette.white.main,
    },
    text: {
      default: baseTheme.palette.blue.dark,
    },
  },
  components: {
    appBar: {
      border: `1px solid ${baseTheme.palette.gray.light}`,
      height: baseTheme.spacing(10),
      horizontalPadding: baseTheme.spacing(3),
    },
  },
};

export type AppTheme = typeof defaultTheme;

export default defaultTheme;
