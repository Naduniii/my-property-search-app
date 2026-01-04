import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import App from '../App';
import {BrowserRouter} from 'react-router-dom';

test('renders search page with properties', ()=> {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    const heading = screen.getByText(/Property Search/i);
    expect (heading).toBeInTheDocument();
});
test('search filters by type', () => {
    render(
        <BrowserRouter>
         <App />
        </BrowserRouter>
    );
    const typeSelect = screen.getByLabelText (/Property Type/i);
    fireEvent.change(typeSelect, {target: {value: "House"}});

    const results = screen.getAllByRole ('heading' , {level: 3});
    results.forEach((res) => {
        expect(res.textContent).toMatch(/House/i);
    });
    
});

test ('adds property to favorites by button click', () => {
    render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
const addButtons = screen.getAllByRole('button', {name: /Add to favorites/i });
fireEvent.click (addButtons[0]);

const favoriteHeading = screen.getByText(/Favorites/i);
expect(favoriteHeading).toBeInTheDocument();

const removeButtons = screen.getAllByRole('button', {name: /Remove/i });
expect (removeButtons.length).toBeGreaterThan(0);
});

test('removes property from favourites by button click', () => {
    render (
        <BrowserRouter>
        <App />
        </BrowserRouter>
    );
    const addButtons = screen.getAllByRole ('button', {name: /Add to favorites/i});
    fireEvent.click(addButtons[0]);

    const removeButtons = screen.getAllByRole ('button', {name: /Remove/i});
    fireEvent.click(removeButtons[0]);

    const  noFavoritesText = screen.getByText(/No favoutite properties yet/i);
    expect ( noFavoritesText).toBeInTheDocument();
});

test ('clears all favorites' ,() => {
    render (
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    );

    const addButtons = screen.getAllByRole('button', {name: /Add to favorites/i});
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
 
    const clearButton = screen.getByRole('button', { name: /Clear all favorites/i });
    fireEvent.click(clearButton);

    const noFavoritesText = screen.getByText(/No favorite properties yet/i);
    expect(noFavoritesText).toBeInTheDocument();
});


