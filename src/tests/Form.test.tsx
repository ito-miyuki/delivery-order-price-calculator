import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Form from "../components/Form";

// テスト用のプロップスを準備
const mockProps = {
  venueSlug: "",
  setVenueSlug: vi.fn(),
  cartValue: null,
  setCartValue: vi.fn(),
  latitude: null,
  setLatitude: vi.fn(),
  longitude: null,
  setLongitude: vi.fn(),
  updateFeesState: vi.fn(),
  total: null,
};

describe("Form Component", () => {
  it("renders correctly", () => {
    render(<Form {...mockProps} />);

    // 基本的な要素が存在することを確認
    expect(screen.getByLabelText("Venue Slug")).toBeInTheDocument();
    expect(screen.getByLabelText("Cart Value")).toBeInTheDocument();
    expect(screen.getByLabelText("Latitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Longitude")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get location/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calculate delivery price/i })).toBeInTheDocument();
  });

  // it("allows user to input venue slug", async () => {
  //   render(<Form {...mockProps} />);
  //   const input = screen.getByLabelText("Venue Slug");
  //   await userEvent.type(input, "test-slug");

  //   expect(mockProps.setVenueSlug).toHaveBeenCalledTimes("test-slug".length);
  //   expect(mockProps.setVenueSlug).toHaveBeenCalledWith("t");
  //   expect(mockProps.setVenueSlug).toHaveBeenCalledWith("test-slug");
  // });

  it("displays error message for invalid cart value", async () => {
    render(<Form {...mockProps} />);
    const input = screen.getByLabelText("Cart Value");

    // 無効な値を入力
    await userEvent.type(input, "-10");
    expect(screen.getByText("Cart value must be greater than 0.")).toBeInTheDocument();
  });

  it("hides error message when input is corrected", async () => {
    render(<Form {...mockProps} />);
    const input = screen.getByLabelText("Cart Value");

    // 無効な値を入力
    await userEvent.type(input, "-10");
    expect(screen.getByText("Cart value must be greater than 0.")).toBeInTheDocument();

    // 有効な値に修正
    await userEvent.clear(input);
    await userEvent.type(input, "100");
    expect(screen.queryByText("Cart value must be greater than 0.")).not.toBeInTheDocument();
  });
});
