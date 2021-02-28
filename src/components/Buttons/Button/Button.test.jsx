import { render, screen } from '@testing-library/react';
import noop from '../../../shared/noop';
import { Button } from './Button';

describe('Button', () => {
  it('should show passed text', () => {
    render(<Button action={noop} styles='' name='hello' />);
    const buttonText = screen.getByRole('button', { name: /hello/i });

    expect(buttonText).toBeInTheDocument();
    expect(buttonText.tagName).toBe('BUTTON');
  });
});
