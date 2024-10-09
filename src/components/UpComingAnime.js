import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingAnime = () => {
    const [animeList, setAnimeList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUpcomingAnime = async () => {    
            try {
                setError('');
                const response = await axios.get('https://api.jikan.moe/v4/seasons/upcoming');
                setAnimeList(response.data.data);
            } catch (err) {
                setError('Gagal mengambil data anime upcoming.');
            }
        };

        fetchUpcomingAnime();
    }, []);

    return (
        <div className="mt-5 max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Anime yang Akan Datang</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-wrap justify-between">
                {animeList.map((anime) => (
                    <div className="p-4 border border-gray-300 rounded max-w-[250px] max-h-max" key={anime.mal_id}>
                        <img className='' src={anime.images.jpg.image_url} alt={anime.title}></img>
                        <h3 className="text-xl font-bold">{anime.title}</h3>
                        <p><strong>Rilis:</strong> {anime.aired.from ? new Date(anime.aired.from).toDateString() : 'TBA'}</p>
                        <p><strong>Episode:</strong> {anime.episodes || 'TBA'}</p>
                        <p><strong>Skor:</strong> {anime.score || 'Belum Dinilai'}</p>
                        <a
                            href={`https://myanimelist.net/anime/${anime.mal_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Lihat Detail
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingAnime;