import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingAnime = () => {
    const [animeList, setAnimeList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUpcomingAnime = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get('https://api.jikan.moe/v4/seasons/upcoming');
                setAnimeList(response.data.data);
            } catch (err) {
                setError('Gagal mengambil data anime upcoming: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingAnime();
    }, []);

    return (
        <div className="mt-10 max-w-7xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Upcoming Anime</h2>

            {/* Loading dan Error */}
            {loading && <p className="text-gray-500 text-center text-lg">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Daftar Anime */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {animeList.map((anime) => {
                    const japaneseTitle = anime?.titles?.find(title => title.type === "Japanese")?.title || "N/A";
                    const englishTitle = anime?.titles?.find(title => title.type === "English")?.title || "N/A";
                    const genres = anime?.genres?.map((genre) => genre.name).join(", ");
                    const releaseDate = anime.aired.from ? new Date(anime.aired.from).toDateString() : 'TBA';

                    return (
                        <div
                            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
                            key={anime.mal_id}
                        >
                            <img
                                className="w-full h-48 object-cover rounded-t-lg"
                                src={anime.images.jpg.large_image_url}
                                alt={anime.title}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-1">{anime.title}</h3>
                                <p className="text-base font-bold text-gray-600 mb-2">English: {englishTitle}</p>
                                <p className="text-sm"><strong>Rilis:</strong> {releaseDate}</p>
                                <p className="text-sm"><strong>Genre:</strong> {genres || 'N/A'}</p>
                                <p className="text-sm"><strong>Episode:</strong> {anime.episodes || 'TBA'}</p>
                                <p className="text-sm"><strong>Source:</strong> {anime.source || 'N/A'}</p>
                                <p className="text-sm"><strong>Skor:</strong> {anime.score || 'Not Rated Yet'}</p>
                                <a
                                    href={`https://myanimelist.net/anime/${anime.mal_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mt-2 inline-block"
                                >
                                    Lihat Detail
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingAnime;