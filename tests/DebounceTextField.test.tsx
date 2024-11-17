import { fireEvent, render, screen } from '@testing-library/react';
import DebounceTextField from "../src";

it('onChange callback not called until after 500ms', async () => {
    let start = 0;
    let finish = 0;
    let resolve: () => void = null!;
    let text = '';

    let promise = new Promise<void>(res => resolve = res);
    const onChange = jest.fn((value) => {
        finish = new Date().getTime();
        text = value;
        resolve();
    });
    render(
        <DebounceTextField data-testid="field" onChange={onChange}/>
    );

    start = new Date().getTime();
    const input = screen.getByTestId(/field/i)?.querySelector('input') as HTMLElement;

    fireEvent.change(input, {target: {value: 'test input'}});

    await promise;
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(finish - start).toBeGreaterThan(500);
    expect(text).toBe('test input');
});