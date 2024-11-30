// src/AnimeSearch.js
import React, { useState } from 'react';
import axios from 'axios';

export default function AnimeSearch() {
    const [query, setQuery] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const URL = 'https://api.jikan.moe/v4/anime';

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError('');
            setSelectedAnime(null);
            const response = await axios.get(URL, {
                params: { q: query }
            });
            setAnimeList(response.data.data);
        } catch (err) {
            setError('Terjadi kesalahan saat mengambil data dari API.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAnimeVideos = async (animeId) => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/${animeId}/videos`);
            setVideos(response.data.data || []);
        } catch (err) {
            setError('Gagal mengambil video anime.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAnime = (anime) => {
        setSelectedAnime(anime);
        fetchAnimeVideos(anime.mal_id);
    };

    return (
        <div className="max-w-7xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
            {/* Input Search */}
            <div className="flex mb-6">
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-300"
                >
                    Cari
                </button>
            </div>

            {/* Loading dan Error */}
            {loading && <p className="text-center text-lg text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Daftar Anime */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {animeList.map((anime) => {
                    const japaneseTitle = anime?.titles?.find((t) => t.type === 'Japanese')?.title || 'N/A';

                    return (
                        <div
                            className="bg-white p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
                            key={anime.mal_id}
                        >
                            <img
                                src={anime.images.jpg.large_image_url}
                                alt={anime.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="text-lg font-semibold mt-2">{anime.title}</h3>
                            <p className="text-base font-bold text-gray-600">Japanese: {japaneseTitle}</p>
                            <p className="text-sm"><strong>Rating:</strong> {anime.rating}</p>
                            <p className="text-sm"><strong>Genre:</strong> {anime.genres.map((genre) => genre.name).join(', ')}</p>
                            <p className="text-sm"><strong>Status:</strong> {anime.status}</p>
                            <p className="text-sm"><strong>Score:</strong> {anime.score}</p>
                            <button
                                onClick={() => handleSelectAnime(anime)}
                                className="mt-2 text-blue-500 hover:underline text-sm"
                            >
                                Lihat Video
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Video Anime */}
            {selectedAnime && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Video untuk {selectedAnime.title}</h2>
                    {videos.length > 0 ? (
                        <div className="space-y-4">
                            {videos.map((video, index) => (
                                <div key={index}>
                                    <h3 className="text-lg">{video.title}</h3>
                                    <a
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Tonton Video
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">Tidak ada video yang ditemukan untuk anime ini.</p>
                    )}
                </div>
            )}
        </div>
    );
}