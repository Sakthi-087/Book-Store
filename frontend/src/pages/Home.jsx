import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3001/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
                alert("Failed to fetch books. Please try again.");
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4 sm:p-6 max-w-6xl mx-auto'>
            {/* Toggle Buttons */}
            <div className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-x-4 my-4'>
                <button
                    className={`w-full sm:w-auto px-5 py-2 rounded-lg transition-all duration-300 text-lg 
                        ${showType === 'table' 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-gray-200 hover:bg-blue-400 hover:text-white'}
                    `}
                    onClick={() => setShowType('table')}
                >
                    Table View
                </button>
                <button
                    className={`w-full sm:w-auto px-5 py-2 rounded-lg transition-all duration-300 text-lg 
                        ${showType === 'card' 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-gray-200 hover:bg-blue-400 hover:text-white'}
                    `}
                    onClick={() => setShowType('card')}
                >
                    Card View
                </button>
            </div>

            {/* Title & Add Button */}
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4'>
                <h1 className='text-2xl sm:text-4xl font-semibold text-gray-800 text-center sm:text-left'>📚 Books List</h1>
                <Link to='/books/create' className='group mt-3 sm:mt-0'>
                    <MdOutlineAddBox 
                        className='text-blue-600 text-5xl sm:text-6xl transition-transform transform group-hover:scale-110'
                    />
                </Link>
            </div>

            {/* Content */}
            {loading ? (
                <Spinner />
            ) : books.length === 0 ? (
                <p className="text-center text-gray-500 text-lg sm:text-xl animate-fade-in">
                    No books available. 📖
                </p>
            ) : (
                <div className="animate-fade-in">
                    {showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />}
                </div>
            )}
        </div>
    );
};

export default Home;
