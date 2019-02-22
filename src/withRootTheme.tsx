import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import theme from './config/theme';

function withRootTheme(Component: React.ComponentType) {
    return (props: object) => {
        // MuiThemeProvider makes the theme available down the React tree thanks to React context.
        return (
            <MuiThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                {/* <CssBaseline /> */}
                <Component {...props} />
            </MuiThemeProvider>
        );
    };
}

export default withRootTheme;
