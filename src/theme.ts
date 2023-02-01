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
      horizontalPadding: baseTheme.spacing(4),
    },
    avatar: {
      background: baseTheme.palette.yellow.main,
      textColor: baseTheme.palette.white.main,
      fontSize: '23px',
      fontWeight: baseTheme.typography.fontWeightBold,
      radius: '5px',
      size: '43px',
    },
    sideNav: {
      itemPadding: `${baseTheme.spacing(1.5)} ${baseTheme.spacing(4)}`,
    },
    select: {
      background: baseTheme.palette.green.main,
      menuRadius: '5px',
      menuMinWidth: '135px',
      menuItemPaddingY: baseTheme.spacing(0.5),
      menuItemPaddingX: baseTheme.spacing(1.5),
      color: baseTheme.palette.white.main,
      colorFocus: baseTheme.palette.gray.light,
      fontSize: '14px',
    },
    dateInput: {
      background: baseTheme.palette.green.main,
      radius: '5px',
      color: baseTheme.palette.white.main,
      paddingY: baseTheme.spacing(1),
      paddingX: baseTheme.spacing(1.5),
      fontSize: '14px',
    },
    card: {
      background: baseTheme.palette.blue.light,
      radius: '10px',
      padding: `${baseTheme.spacing(2)}`,
    },
    accordion: {
      contentMargin: baseTheme.spacing(2),
      itemBackground: baseTheme.palette.white.main,
      itemRadius: '10px',
      itemPadding: baseTheme.spacing(3),
      itemFontWeight: baseTheme.typography.fontWeightBold,
      itemFontSize: baseTheme.typography.fontSize,
      itemsGap: baseTheme.spacing(0.5),
    },
    table: {
      headBackground: baseTheme.palette.white.main,
      oddRowBackground: baseTheme.palette.blue.light,
      evenRowBackground: baseTheme.palette.white.main,
      cellPadding: `${baseTheme.spacing(1)} ${baseTheme.spacing(1)}`,
    },
    button: {
      backgroundColor: baseTheme.palette.blue.main,
      backgroundColorHighlight: baseTheme.palette.blue.dark,
      color: baseTheme.palette.white.main,
      padding: `${baseTheme.spacing(1)} ${baseTheme.spacing(2)}`,
      radius: '5px',
    },
  },
};

export type AppTheme = typeof defaultTheme;

export default defaultTheme;
