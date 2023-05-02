import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { Navbar } from '@/components/Navbar/Navbar';

describe('Navigationbar', () => {
  test('Navigationbar must be rendered in all pages.', () => {
    render(<Navbar />);

    const services = screen.getByTestId('Services');
    const about = screen.getByTestId('About');
    const contact = screen.getByTestId('Contact');

    expect(services).toHaveTextContent('Services'); // Pass
    expect(about).toHaveTextContent('About us'); // Pass
    expect(contact).toHaveTextContent('Contact us'); // Pass
  });
});
