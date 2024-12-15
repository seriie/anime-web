import { useEffect, useState } from "react";

export default function OnGoingAnime() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const URL = 'https://api.jikan.moe/v4/seasons/now';

    const handleFetchOngoingAnime = async () => {
        try {
            const response = await fetch(URL);
            const result = await response.json();
            setData(result.data); // Hanya ambil array anime
            setLoading(false);

        } catch (e) {
            setError('Error fetching on going anime: ' + e.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchOngoingAnime();
    }, []);

    return (
        <div className="mt-10 max-w-7xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">OnGoing Anime</h2>

            {loading && <p className="text-gray-500 text-center text-lg">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.isArray(data) && data.map((anime) => {
                    const japaneseTitle = anime?.titles?.find(title => title.type === "Japanese")?.title || "N/A";
                    const englishTitle = anime?.titles?.find(title => title.type === "English")?.title || "N/A";
                    const genres = anime?.genres?.map((genre) => genre.name).join(", ");
                    const releaseDate = anime.aired.from ? new Date(anime.aired.from).toDateString() : 'TBA';
                    const animeTrailer = anime.trailer.url;

                    return (
                        <div
                        className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
                        key={anime.mal_id}
                        >
                             <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full h-48 object-cover rounded-t-lg" />
                             <div className="p-4">
                                <h2 className="text-lg font-semibold mt-2">{anime.title}</h2>
                                <p className="text-base font-bold text-gray-600 mb-2">English: {englishTitle}</p>
                                <p className="text-sm"><strong>Release:</strong> {releaseDate}</p>
                                <p className="text-sm"><strong>Genre:</strong> {genres || 'N/A'}</p>
                                <p className="text-sm"><strong>Episode:</strong> {anime.episodes || 'TBA'}</p>
                                <p className="text-sm"><strong>Source:</strong> {anime.source || 'N/A'}</p>
                                <p className="text-sm"><strong>Skor:</strong> {anime.score || 'Not Rated Yet'}</p>

                                <div className="justify-between flex items-center">
                                    <a
                                        href={`https://myanimelist.net/anime/${anime.mal_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline mt-2 inline-block"
                                    >
                                        See Detail
                                    </a>
                                    {animeTrailer ? 
                                        <a href={anime.trailer.url}>
                                            <button className="justify-center p-2 text-slate-50 hover:bg-sky-400 transition-all duration-200 hover:-translate-y-1 rounded-md bg-sky-500">Watch Trailer</button>
                                        </a> : <p className="text-gray-400">No trailer</p>
                                    }
                                </div>
                             </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
