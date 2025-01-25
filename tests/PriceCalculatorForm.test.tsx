import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { PriceCalculatorForm } from "../src/components/PriceCalculatorForm/PriceCalculatorForm";

const mockSetVenueSlug = vi.fn();
const mockSetCartValue = vi.fn();
const mockSetLatitude = vi.fn();
const mockSetLongitude = vi.fn();
const mockUpdateFeesState = vi.fn();

const defaultProps = {
  venueSlug: "",
  setVenueSlug: mockSetVenueSlug,
  cartValue: null,
  setCartValue: mockSetCartValue,
  latitude: null,
  setLatitude: mockSetLatitude,
  longitude: null,
  setLongitude: mockSetLongitude,
  updateFeesState: mockUpdateFeesState,
};

describe("PriceCalculatorForm Component", () => {
  it("renders all form fields and buttons", () => {
    render(<PriceCalculatorForm {...defaultProps} />);

    expect(screen.getByLabelText("Venue Slug")).toBeInTheDocument();
    expect(screen.getByLabelText("Cart Value (€)")).toBeInTheDocument();
    expect(screen.getByLabelText("Latitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Longitude")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get location/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calculate delivery price/i })).toBeInTheDocument();
  });

  it("displays error message for invalid cart value (<= 0)", async () => {
    render(<PriceCalculatorForm {...defaultProps} />);
    const cartValueInput = screen.getByLabelText("Cart Value (€)");

    await userEvent.type(cartValueInput, "-10");
    expect(screen.getByText("Cart value must be greater than 0.")).toBeInTheDocument();
  });

  it("clears error message when cart value is corrected", async () => {
    render(<PriceCalculatorForm {...defaultProps} />);
    const cartValueInput = screen.getByLabelText("Cart Value (€)");

    await userEvent.type(cartValueInput, "-10");
    expect(screen.getByText("Cart value must be greater than 0.")).toBeInTheDocument();

    await userEvent.clear(cartValueInput);
    await userEvent.type(cartValueInput, "100");
    expect(screen.queryByText("Cart value must be greater than 0.")).not.toBeInTheDocument();

    expect(mockSetCartValue).toHaveBeenCalledWith(100);
  });

  it("displays error if Venue Slug is empty on submit", async () => {
    render(<PriceCalculatorForm {...defaultProps} />);
    const submitButton = screen.getByRole("button", { name: /calculate delivery price/i });

    await userEvent.click(submitButton);
    expect(screen.getByText("Venue slug is required.")).toBeInTheDocument();
  });

  it("displays error if latitude or longitude is empty on submit", async () => {
    render(<PriceCalculatorForm {...defaultProps} />);
    const submitButton = screen.getByRole("button", { name: /calculate delivery price/i });

    await userEvent.type(screen.getByLabelText("Venue Slug"), "some-venue");
    await userEvent.type(screen.getByLabelText("Cart Value (€)"), "10");

    await userEvent.click(submitButton);

    expect(screen.getByText("Latitude is required.")).toBeInTheDocument();
    expect(screen.getByText("Longitude is required.")).toBeInTheDocument();
  });

  it("clears all errors when inputs are corrected", async () => {
    render(<PriceCalculatorForm {...defaultProps} />);
    const submitButton = screen.getByRole("button", { name: /calculate delivery price/i });

    await userEvent.click(submitButton);

    expect(screen.getByText("Venue slug is required.")).toBeInTheDocument();
    expect(screen.getByText("Cart value is required.")).toBeInTheDocument();
    expect(screen.getByText("Latitude is required.")).toBeInTheDocument();
    expect(screen.getByText("Longitude is required.")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Venue Slug"), "some-venue");
    await userEvent.type(screen.getByLabelText("Cart Value (€)"), "10");
    await userEvent.type(screen.getByLabelText("Latitude"), "60");
    await userEvent.type(screen.getByLabelText("Longitude"), "24");

    expect(screen.queryByText("Venue slug is required.")).not.toBeInTheDocument();
    expect(screen.queryByText("Cart value is required.")).not.toBeInTheDocument();
    expect(screen.queryByText("Latitude is required.")).not.toBeInTheDocument();
    expect(screen.queryByText("Longitude is required.")).not.toBeInTheDocument();
  });
});
