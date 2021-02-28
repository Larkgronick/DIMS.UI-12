import { render, screen } from '@testing-library/react';
import noop from '../../../shared/noop';
import { SaveButton } from './SaveButton';

describe('SaveButton', () => {
  it('should show save by default', () => {
    render(<SaveButton name='' styles='' action={noop} />);
    const buttonText = screen.getByRole('button');
    expect(buttonText).toBeInTheDocument();
    expect(buttonText.tagName).toBe('BUTTON');
  });
});
