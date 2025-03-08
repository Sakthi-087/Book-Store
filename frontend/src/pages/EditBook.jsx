import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3001/books/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setPublishYear(res.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Failed to load book data.', { variant: 'error' });
                console.error(error);
            });
    }, [id]);

    const handleEditBook = () => {
        const data = { title, author, publishYear };
        setLoading(true);
        axios
            .put(`http://localhost:3001/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Edited Successfully!', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error updating book.', { variant: 'error' });
                console.error(error);
            });
    };

    return (
        <div className="p-4 min-h-screen flex flex-col items-center">
            <BackButton />
            <h1 className="text-2xl sm:text-3xl font-semibold my-4 text-center">✏️ Edit Book</h1>
            
            {loading && <Spinner />}

            <div className="w-full max-w-lg border border-sky-400 rounded-xl p-6 shadow-md bg-white">
                <div className="space-y-4">
                    <div>
                        <label className="block text-lg font-medium text-gray-600">Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter book title"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-600">Author</label>
                        <input 
                            type="text" 
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter author's name"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-600">Publish Year</label>
                        <input 
                            type="number" 
                            value={publishYear} 
                            onChange={(e) => setPublishYear(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter publish year"
                        />
                    </div>
                </div>

                <button
                    className={`w-full mt-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 
                        ${loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'}`}
                    onClick={handleEditBook}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default EditBook;
