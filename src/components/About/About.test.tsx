import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('App', () => {

  beforeEach(() => {
    render(<About />);
  });

  it('should render app title', () => {
    expect(screen.getByTestId('about-page')).toHaveClass('about');
  });

  it('should render logo and desc', () => {
    expect(screen.getByTestId('about-page')).toContainHTML('pages.about.desc');
    expect(screen.getByTestId('about-image')).toContainHTML('logo.svg');
  });
});
