import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { test, expect } from 'vitest';

test('renders search page with properties', () => {
  render(<App />);
  const heading = screen.getByText(/Property Search/i);
  expect(heading).toBeInTheDocument();
});

test('search filters by type', async () => {
  render(<App />);
  const typeSelect = screen.getByLabelText(/Property Type/i);
  await userEvent.click(typeSelect);

  // Each MUI option is presented as a listbox option
  const houseOption = await screen.findByRole('option', { name: 'House' });
  await userEvent.click(houseOption);

  const results = screen.getAllByRole('heading', { level: 3 });
  results.forEach((res) => {
    expect(res.textContent).toMatch(/House/i);
  });
});

test('adds property to favourites by button click', async () => {
  render(<App />);
  const addButtons = screen.getAllByRole('button', { name: /Add to favorites/i });
  await userEvent.click(addButtons[0]);

  // Match UI heading text
  const favouriteHeading = screen.getByRole('heading', { name: /Favourites/i, level: 2 });
  expect(favouriteHeading).toBeInTheDocument();

  const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
  expect(removeButtons.length).toBeGreaterThan(0);
});

test('removes property from favourites by button click', async () => {
  render(<App />);
  const addButtons = screen.getAllByRole('button', { name: /Add to favorites/i });
  await userEvent.click(addButtons[0]);

  const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
  await userEvent.click(removeButtons[0]);

  const noFavouritesText = screen.getByText(/No favorite properties yet/i);
  expect(noFavouritesText).toBeInTheDocument();
});

test('clears all favourites', async () => {
  render(<App />);

  const addButtons = screen.getAllByRole('button', { name: /Add to favorites/i });
  await userEvent.click(addButtons[0]);
  await userEvent.click(addButtons[1]);

  // Match real button text in your component
  const clearButton = screen.getByRole('button', { name: /Clear favourites/i });
  await userEvent.click(clearButton);

  const noFavouritesText = screen.getByText(/No favorite properties yet/i);
  expect(noFavouritesText).toBeInTheDocument();
});
