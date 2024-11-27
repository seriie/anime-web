// src/App.js
import React from 'react';
import AnimeSearch from './components/anime_search/AnimeSearch';
import UpcomingAnime from './components/upcoming_anime/UpComingAnime';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Search Anime</h1>
            <AnimeSearch />
            <UpcomingAnime />
        </div>
    );
}

export default App;
