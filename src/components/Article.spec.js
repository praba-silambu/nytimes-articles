import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Articles from "./Articles";
import axios from "axios";

jest.mock("axios");

describe("Articles Component", () => {
  const mockArticles = [
    {
      id: "1",
      title: "Article 1",
      abstract: "Abstract 1",
      published_date: "2025-01-01",
      source: "NY Times",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { results: mockArticles } });
  });

  it("renders the component and title", () => {
    render(<Articles />);
    expect(
      screen.getByText("NY Times Most Popular Articles")
    ).toBeInTheDocument();
  });

  it("should display the loading spinner when fetching data", () => {
    render(<Articles />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display articles after data is loaded", async () => {
    render(<Articles />);

    await waitFor(() => screen.getByText("Article 1"));
    expect(screen.getByText("Article 1")).toBeInTheDocument();
  });

  it("should change the period to 7 days when clicking 'Last 7 Days' button", async () => {
    render(<Articles />);
    const button = screen.getByText("Last 7 Days");
    fireEvent.click(button);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("7"));
  });

  it("should handle error when the API fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch articles"));
    render(<Articles />);
    await waitFor(() => screen.getByText("NY Times Most Popular Articles"));
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should update the period and fetch articles accordingly", async () => {
    render(<Articles />);
    fireEvent.click(screen.getByText("Last 1 Day"));
    await waitFor(() => screen.getByText("Article 1"));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("1"));
  });
});
