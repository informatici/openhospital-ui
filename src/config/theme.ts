import { CSSProperties } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { ellipsis, fonts, margin, padding } from '../shared/utils/style-utils';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        // gradient: {
        //     startColor?: React.CSSProperties['color'],
        //     endColor?: React.CSSProperties['color']
        // };

        // progress: {
        //     size?: number;
        //     thickness?: number;
        // };

        // fonts: {
        //     serif: string;
        //     sans: string;
        //     [key: string]: string
        // };
    }

    interface ThemeOptions {
        // gradient: {
        //     startColor?: React.CSSProperties['color'];
        //     endColor?: React.CSSProperties['color'];
        // };

        // progress: {
        //     size?: number;
        //     thickness?: number;
        // };

        // fonts: {
        //     serif: string;
        //     sans: string;
        //     [key: string]: string;
        // }
    }
}

declare module '@material-ui/core/styles/createMixins' {
    interface Mixins {
        padding: (value?: number | number[]) => CSSProperties;
        margin: (value?: number | string | any[]) => CSSProperties;
        ellipsis: (display?: string) => CSSProperties;
    }

    interface MixinsOptions {
        padding: (value?: number | number[]) => CSSProperties;
        margin: (value?: number | string | any[]) => CSSProperties;
        ellipsis: (display?: string) => CSSProperties;
    }
}

declare module '@material-ui/core/styles/createPalette' {
    interface PaletteColor {
        background?: string;
        backgroundDark?: string;
        backgroundLight?: string;
        white?: string;
    }

    interface SimplePaletteColorOptions {
        background?: string;
        backgroundDark?: string;
        backgroundLight?: string;
        white?: string;
    }
}

const primaryPalette = {

    text: '#444444',
    darkGrey: '#444444',
    main: '#ffffff',
    grey: '#8D8D8F',
    lightGrey: '#EEEEEE',
    red: '#FE4641',
    light: '#fffeef',
    white: '#fff',
    inputBorder: '#C4C4C4'

    // dark: '#ffd402',
    // A100: 'rgba(251, 237, 66, 0.5)',
};

const secondaryPalette = {
    text: '#fff',
    // dark: '#1c5762', // currently not in design. Set as darken(#277a8a, 10%)
    light: '#67a2ad',
    main: '#FE4641',
    background: '#dee8df',
    backgroundLight: '#ebf0ec',
    backgroundDark: '#c3d5c5',
    white: '#fff',
};

const theme: ThemeOptions = {
    direction: 'ltr',

    // shape:{
    //     borderRadius: 0
    // },

    // typography: {
    //     fontSize: 14,

    //     display1: {
    //         fontFamily: fonts.serif,
    //         color: '#000000',
    //         fontSize: 22,
    //         lineHeight: '1.5em',
    //     },
    //     display2: {
    //         fontFamily: fonts.serif,
    //         color: '#000000',
    //         fontSize: 20,
    //         fontWeight: 700,
    //         letterSpacing: 0.25,
    //         lineHeight: '1.5em',

    //         '@media (min-width: 600px)': {
    //             fontSize: 24,
    //         },
    //     },
    //     display3: {
    //         fontFamily: fonts.serif,
    //         color: '#000',
    //         fontSize: 32,
    //         fontWeight: 700,
    //         lineHeight: '1.5em',
    //     },
    //     headline: {
    //         color: '#000000',
    //         fontFamily: fonts.serif,
    //         fontSize: 16,
    //         fontWeight: 700,
    //         lineHeight: '1.5em',
    //     },
    //     title: {
    //         fontFamily: fonts.serif,
    //         fontSize: 18,
    //         fontWeight: 700,
    //         lineHeight: '1.5em',
    //     },
    //     subheading: {
    //         color: 'rgba(0, 0, 0, 0.87)',
    //         fontSize: 18,
    //         fontWeight: 300,
    //         lineHeight: '1.5em',
    //     },
    // },

    palette: {
        primary: primaryPalette,
        secondary: secondaryPalette,
    },

    mixins: {
        padding,
        margin,
        ellipsis
    },

    // gradient: {
    //     startColor: '#DEE8DF',
    //     endColor: '#FBED42',
    // },

    // progress: {
    //     size: 75,
    //     thickness: 3
    // },

    // fonts,

    overrides: {
        MuiButton: {
            contained: {
                boxShadow: 'none',
            },
            raised: {
                boxShadow: 'none',
            },
            outlinedPrimary: {
                color: '#000000',
                borderColor: primaryPalette.main,
                '&:hover': {
                    borderColor: primaryPalette.red,
                },
            },
        },
        MuiBadge: {
            badge: {
                height: 17,
                minWidth: 17,
                border: '1px solid #fff',
                fontSize: 12,
                fontWeight: 'bold',
            }
        },
        MuiGrid: {
            container: {
                // xs, extra-small: 0px or larger
                maxWidth: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: 15,
                paddingRight: 15,

                // sm, small: 600px or larger
                /*'@media (min-width: 600px)': {
                    maxWidth: (600- 30) + 'px'
                },*/

                // md, medium: 960px or larger
                '@media (min-width: 960px)': {
                    maxWidth: (960 - 30) + 'px'
                },

                // lg, large: 1280px or larger
                '@media (min-width: 1280px)': {
                    maxWidth: (1280 - 30) + 'px'
                },

                // xl, extra-large: 1920px or larger
                '@media (min-width: 1920px)': {
                    maxWidth: '1360px'
                },
            },
        },
    },
};

export default createMuiTheme(theme);
