# DebounceTextField
## Description
A React component based on [@mui/material/TextField](https://mui.com/material-ui/react-text-field/). The onChange callback is
called only after the user has stopped modifying the text in the field for a defined period of time.

## Installation
`npm install @mattyreacts/debouncetextfield`

## Usage
See [MUI TextField API](https://mui.com/material-ui/api/text-field/) for TextField properties

### Extended Properties

| Name     | Type                                 | Default    | Description                                                          |
|----------|--------------------------------------|------------|----------------------------------------------------------------------|
| delay    | `number`                             | 500        | The delay on the debounce in milliseconds                            |
| onChange | `(value: string) => void`            | -          | The callback to call after the delay timeout once editing has ceased |
| value    | `string`                             | -          | The value of the field                                               |
| variant  | `'filled' | 'outlined' | 'standard'` | 'outlined' | The text field variant to use                                        |

## Example
```
import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import DebounceTextField from "@mattyreacts/debouncetextfield";
import { Stack, Typography } from "@mui/material";

function DelaySearch(): React.JSX.Element {
    const [items, setItems] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value);
    }, []);

    useEffect((): void => {
        if(search.trim() === '')
            return;
        
        (async (): Promise<void> => {
            try {
                const res = await fetch(`/search?query=${search}`);
                const items = await res.json();
                setItems(items);
            } catch(err) {
                console.error(err);
            }
        })();
    }, [search]);

    return (
        <Stack direction="column">
            <DebounceTextField value={search} onChange={handleSearchChange} />
            {items.map((item: string, index: number) => (
                <Typography variant="body1" key={`item${index}`}>{item}</Topography>
            ))}
        </Stack>
    );
}
```