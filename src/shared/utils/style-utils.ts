import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const fonts = {
    sans: 'Roboto, Arial, Helvetica, FreeSans, "Liberation Sans", sans-serif',
    serif: '"Tisa Pro", ff-tisa-pro, ff-tisa-web-pro, TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif'
};

/**
 * Mixin for the paddings. Works as css values:
 * 1 value on all 4 sides,
 * 2 values on "x" and "y"
 * 3 values on "top" "y" and "bottom"
 * 4 values on "top" "right" "bottom" and "left"
 * @param {(number|number[])} values - An array of values, or a single value
 */
export const padding = (values: number | number[] = 0): CSSProperties => {
    if (Array.isArray(values)) {

        if (values.length === 1) {
            return {
                paddingTop: values[0],
                paddingRight: values[0],
                paddingBottom: values[0],
                paddingLeft: values[0]
            };
        }

        if (values.length === 2) {
            return {
                paddingTop: values[0],
                paddingRight: values[1],
                paddingBottom: values[0],
                paddingLeft: values[1]
            };
        }

        if (values.length === 3) {
            return {
                paddingTop: values[0],
                paddingRight: values[1],
                paddingBottom: values[2],
                paddingLeft: values[1]
            };
        }

        if (values.length === 4) {
            return {
                paddingTop: values[0],
                paddingRight: values[1],
                paddingBottom: values[2],
                paddingLeft: values[3]
            };
        }

        return {};
    }

    return {
        padding: values
    }
};

/**
 * Mixin for the margins. Works as css values:
 * 1 value on all 4 sides,
 * 2 values on "x" and "y"
 * 3 values on "top" "y" and "bottom"
 * 4 values on "top" "right" "bottom" and "left"
 * @param {(number|number[])} values - An array of values, or a single value
 */
export const margin = (values: number | number[] = 0): CSSProperties => {
    if (Array.isArray(values)) {

        if (values.length === 1) {
            return {
                marginTop: values[0],
                marginRight: values[0],
                marginBottom: values[0],
                marginLeft: values[0]
            };
        }

        if (values.length === 2) {
            return {
                marginTop: values[0],
                marginRight: values[1],
                marginBottom: values[0],
                marginLeft: values[1]
            };
        }

        if (values.length === 3) {
            return {
                marginTop: values[0],
                marginRight: values[1],
                marginBottom: values[2],
                marginLeft: values[1]
            };
        }

        if (values.length === 4) {
            return {
                marginTop: values[0],
                marginRight: values[1],
                marginBottom: values[2],
                marginLeft: values[3]
            };
        }

        return {};
    }

    return {
        margin: values
    }
};

export const ellipsis = (display: string = 'block'): CSSProperties => ({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
});
