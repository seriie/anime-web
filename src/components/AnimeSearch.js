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
    const URL = 'https://api.jikan.moe/v4/anime'

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
            console.log(response.data);
            setVideos(response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError('Gagal mengambil video anime.');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAnime = (anime) => {
        setSelectedAnime(anime);
        fetchAnimeVideos(anime.mal_id);
    };

    return (
        <div className="max-w-7xl mx-auto bg-white p-6 grid-cols-4 rounded-lg shadow-lg">
            <div className="flex mb-4">
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Masukkan judul anime..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Cari
                </button>
            </div>
            {loading && <p className='text-center text-3xl relative justify-center text-gray-500'>Laoading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-wrap justify-between">
                {animeList.map((anime) => {
                    const japaneseTitle = anime?.titles?.find(t => t.type === "Japanese")?.title || "N/A";
                    
                    return (
                        <div className="p-4 border border-gray-300 rounded max-w-[250px] max-h-max" key={anime.mal_id}>
                            <img src={anime.images.jpg.image_url} alt={anime.title} className=" h-auto rounded" />
                            <h3 className="text-xl font-bold">{anime.title}</h3>
                            <h3 className="text-xl font-bold">Japan: {japaneseTitle}</h3>
                            <p><strong>Rating:</strong> {anime.rating}</p>
                            <p><strong>Genre:</strong> {anime.genres.map((genre) => genre.name).join(', ')}</p>
                            <p><strong>Status:</strong> {anime.status}</p>
                            <button
                                onClick={() => handleSelectAnime(anime)}
                                className="text-blue-500 hover:underline"
                            >
                                Lihat Video
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Tampilkan video jika anime dipilih */}
            {selectedAnime && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Video untuk {selectedAnime.title}</h2>
                    {videos.length > 0 ? (
                        <div className="space-y-4">
                            {videos.map((video) => (
                                <div key={video.mal_id}>
                                    <h3 className="text-xl">{video.title}</h3>
                                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        Tonton Video
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Tidak ada video yang ditemukan untuk anime ini.</p>
                    )}
                </div>
            )}
        </div>
    );
};
