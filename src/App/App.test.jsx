import { render, screen } from '@testing-library/react';
import { App } from './App';
import firebase from '../services/firebase';

jest.mock('firebase');

test('renders App component with welcome message by default', () => {
  firebase.auth = jest.fn(() => ({
    onAuthStateChanged: jest.fn(() => jest.fn()),
  }));

  render(<App />);
  const linkElement = screen.getByText(/welcome/i);
  screen.debug();
  expect(linkElement).toBeInTheDocument();
});
