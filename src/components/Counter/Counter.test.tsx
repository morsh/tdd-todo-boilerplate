import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../__tests__/utils/testRenderer';
import { Counter } from './Counter';

// Todo: update tests
describe('Counter', () => {
  it('should render 0 by default', () => {
    render(<Counter />);
    expect(screen.getByTestId('counter-value')).toContainHTML('0');
  });

  it('should contain `increment` text', () => {
    render(<Counter />);
    expect(screen.getByTestId('counter-inc')).toContainHTML('pages.counter.increment');
  });

  it('should contain translation keys', () => {
    render(<Counter />);
    expect(screen.getByTestId('counter-inc')).toContainHTML('pages.counter.increment');
    expect(screen.getByTestId('counter-dec')).toContainHTML('pages.counter.decrement');
    expect(screen.getByTestId('counter-inc2')).toContainHTML('pages.counter.increase2');
    expect(screen.getByTestId('counter-inc4')).toContainHTML('pages.counter.increase4');
  });

  it('should increment by 1', () => {
    render(<Counter />);
    userEvent.click(screen.getByTestId('counter-inc'));
    expect(screen.getByTestId('counter-value')).toContainHTML('1');
  });

  it('should decrement by 1', () => {
    render(<Counter />, { preloadedState: { counter: 1 } });
    userEvent.click(screen.getByTestId('counter-dec'));
    expect(screen.getByTestId('counter-value')).toContainHTML('0');
  });

  it('should decrement by 2', () => {
    render(<Counter />);
    userEvent.click(screen.getByTestId('counter-inc2'));
    expect(screen.getByTestId('counter-value')).toContainHTML('2');
  });

  it('should decrement by 4', async () => {
    render(<Counter />);
    userEvent.click(screen.getByTestId('counter-inc4'));
    await waitFor(() => expect(screen.getByTestId('counter-value')).toContainHTML('4'));
  });

  it('should send logs when decrementing by 4', async () => {
    render(<Counter />);
    userEvent.click(screen.getByTestId('counter-inc4'));
    await waitFor(() => expect(screen.getByTestId('counter-value')).toContainHTML('4'));
  });
});
