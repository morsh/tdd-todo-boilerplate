import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Button } from './Button';

describe('NavLink', () => {
  it('should be in document', () => {
    const { container } = render(<Button />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Button />);
    expect(container.querySelector('button')).toMatchSnapshot();
  });

  it('button doesnt render as primary', () => {
    const { container } = render(<Button primary />);
    expect(container.querySelector('button')).toHaveStyleRule('background', 'white');
    expect(container.querySelector('button')).toHaveStyleRule('color', 'black');
  });
});
