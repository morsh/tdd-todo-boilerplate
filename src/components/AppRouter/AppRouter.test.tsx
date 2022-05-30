import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithHistory } from './test-utils';

describe('AppRouter', () => {

  it('should render home by default', () => {
    renderWithHistory();
    expect(screen.getByTestId('page-home')).toBeInTheDocument();
  });

  it('should render about when clicking on `about`', async () => {
    const history = renderWithHistory();
    userEvent.click(screen.getByTestId('about-link'));
    await waitFor(() => expect(history.location.pathname).toEqual('/about'));
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('should render no-match page when path isnt found', () => {
    renderWithHistory('/some/bad/route');
    expect(screen.getByTestId('page-no-match')).toBeInTheDocument();
  });

  it('should render home when clicking on `home`', async () => {
    const history = renderWithHistory('/about');
    userEvent.click(screen.getByTestId('home-link'));
    await waitFor(() => expect(history.location.pathname).toEqual('/'));

    expect(screen.getByTestId('page-home')).toBeInTheDocument();
  });

  it('should render counter when clicking on counter', async () => {
    const history = renderWithHistory();
    userEvent.click(screen.getByTestId('counter-link'));
    await waitFor(() => expect(history.location.pathname).toEqual('/counter'));
    expect(screen.getByTestId('counter-page')).toBeInTheDocument();
  });
});
