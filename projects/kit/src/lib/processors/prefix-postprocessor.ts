import {MaskitoOptions} from '@maskito/core';

export function maskitoPrefixPostprocessorGenerator(
    prefix: string,
): NonNullable<MaskitoOptions['postprocessor']> {
    if (!prefix) {
        return elementState => elementState;
    }

    return ({value, selection}, initialElementState) => {
        if (
            value.startsWith(prefix) || // already valid
            (!value && !initialElementState.value.startsWith(prefix)) // cases when developer wants input to be empty
        ) {
            return {value, selection};
        }

        const [from, to] = selection;
        const requiredPrefix = Array.from(prefix).reduce((computedPrefix, char, i) => {
            const newValue = computedPrefix + value;

            return newValue[i] === char ? computedPrefix : computedPrefix + char;
        }, '');

        return {
            selection: [from + requiredPrefix.length, to + requiredPrefix.length],
            value: requiredPrefix + value,
        };
    };
}
