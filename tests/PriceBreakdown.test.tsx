import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceBreakdown } from '../src/components/PriceBreakdown/PriceBreakdown';

describe('PriceBreakdown component', () => {
  it('displays the correct price breakdown for valid input', () => {
    const defaultProps = {
      cartValue: 20,
      deliveryFee: 190,
      deliveryDis: 525,
      surcharge: 0,
      total: 1190,
    };

    render(<PriceBreakdown {...defaultProps} />);

    expect(screen.getByTestId('totalPrice')).toHaveTextContent('11.90 €');
    expect(screen.getByTestId('pricebreakdown-cartValue')).toHaveTextContent('20 €');
    expect(screen.getByTestId('deliveryFee')).toHaveTextContent('1.90 €');
    expect(screen.getByTestId('deliveryDistance')).toHaveTextContent('525 m');
    expect(screen.getByTestId('smallOrderSurcharge')).toHaveTextContent('0.00 €');
  });

  it('displays 0 if cartValue is null', () => {
    const propsWithNullCart = {
      cartValue: null,
      deliveryFee: 250,
      deliveryDis: 1000,
      surcharge: 100,
      total: 1450,
    };

    render(<PriceBreakdown {...propsWithNullCart} />);
    expect(screen.getByTestId('pricebreakdown-cartValue')).toHaveTextContent('0 €');
    expect(screen.getByTestId('totalPrice')).toHaveTextContent('14.50 €');
  });
});
