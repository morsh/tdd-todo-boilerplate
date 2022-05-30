import { render, screen } from '../../../__tests__/utils/testRenderer';
import App from './App';

describe('App', () => {
  it('should render app title', () => {
    render(<App />);
    expect(screen.getByText('app.title')).toBeInTheDocument();
  });

  it('should render app-router', () => {
    render(<App />);
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });
});
