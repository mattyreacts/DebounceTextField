import { BaseTextFieldProps, TextFieldVariants, TextFieldSlotsAndSlotProps, InputProps } from '@mui/material';
import * as React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

interface DebounceTextFieldProps extends BaseTextFieldProps, TextFieldSlotsAndSlotProps<InputProps> {
    /** the delay on the debounce in milliseconds. Default = 500 */
    delay?: number,
    /** the function for the change callback */
    onChange?: (value: string) => void,
    /** the value of the text field */
    value?: string,
    /** MUI text field varian */
    variant?: TextFieldVariants
}

/**
 * A debounce text field based on @mui/material/TextField. The onChange callback is 
 * only called after the user has stopped modifying the field for the specified delay
 */
function DebouncedTextField(
        { onChange, delay = 500, value, variant = "outlined", ...props }: DebounceTextFieldProps,
        ref: React.Ref<HTMLInputElement>
    ): React.JSX.Element  {
    const [inputValue, setInputValue] = useState<string>(value || '');
    const timerId = useRef<NodeJS.Timeout>(null!);

    const debouncedOnChange = useCallback((value: string): void => {
        if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null!;
        }
        timerId.current = setTimeout(() => {
            if(onChange)
                onChange(value);
        }, delay);
    }, [delay, onChange]);

    useEffect((): void => {
        setInputValue(value || '');
    }, [value]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.target.value;
        setInputValue(newValue);
        debouncedOnChange(newValue);
    }, []);

    return (
        <TextField
            {...props}
            inputRef={ref}
            value={inputValue}
            onChange={handleChange}
            variant={variant}
        />
    );
};

export default React.memo(React.forwardRef(DebouncedTextField));
