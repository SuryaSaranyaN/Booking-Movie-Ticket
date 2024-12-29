import React, { useEffect, useState } from 'react';
import { getTheatres, getTheatreCount, getMovieCount, getMovies } from '../api/apiService';

type Theatre = {
    _id: string;
    theatre_name: string;
    location: string;
    capacity: number;
};

const AdminDashboard: React.FC = () => {
    const [theatreCount, setTheatreCount] = useState<number>(0);
    const [theatres, setTheatres] = useState<Theatre[]>([]); 
    const [movieCount,setMoiveCount] = useState<number>(0);
    const [movies,setMovies] = useState<any>([]);

    useEffect(() => {
        const theatreCount = async () => {
            try {
                const count = await getTheatreCount(); 
                setTheatreCount(count.theatreCount); 

                const theatreList = await getTheatres();
                setTheatres(theatreList);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            }
        };
        theatreCount();
    }, []);

    useEffect(() => {
        
        const moiveCount = async () => {
            console.log("movie count", movieCount)
            try {
                const count = await getMovieCount(); 
                setMoiveCount(count.movieCount); 

                const movieList = await getMovies();
                setMovies(movieList);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            }
        };
        moiveCount();
    }, []);



    return (
<div className="mt-10 mx-auto p-4 space-y-6 shadow-lg rounded-sm bg-white max-w-7xl min-h-screen">

            {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1> */}

            {/* Theatre Count Card */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-violet-800 to-violet-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center">Total Theatres</h2>
                    <p className="text-3xl font-bold text-center mt-4">{theatreCount}</p> {/* Ensure theatreCount is a number */}
                </div>
                <div className="bg-gradient-to-r from-sky-700 to-sky-400 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center">Total Movies</h2>
                    <p className="text-3xl font-bold mt-4 text-center">{movieCount}</p> {/* Ensure theatreCount is a number */}
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
