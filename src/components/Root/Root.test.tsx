import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor } from '@testing-library/react';
import { createXHRmock } from '../../../__tests__/utils/xhr-mock';
import { Root } from './Root';

const mockAxios = new MockAdapter(axios);
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Root', () => {

  let open: jest.Mock;
  let restoreXHR: () => void;

  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onGet('/v1.0/App/Settings').reply(200, { features: [] });

    const xhrMock = createXHRmock();
    open = xhrMock.open;
    restoreXHR = xhrMock.restore;
  });

  afterEach(() => {
    restoreXHR();
  });

  it('should render app title', async () => {
    render(<Root />);
    await waitFor(() => expect(screen.getByText('app.title')).toBeInTheDocument());
  });

  it('should render app-router', async () => {
    render(<Root />);
    await waitFor(() => expect(screen.getByText('app.title')).toBeInTheDocument());
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });

  it('should load i18n english resources by default', async () => {
    render(<Root />);
    await waitFor(() => expect(screen.getByText('app.title')).toBeInTheDocument());
    expect(open).toBeCalledWith('GET', '/translations/messages.en.json', true);
  });
});
