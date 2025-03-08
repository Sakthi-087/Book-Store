import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveBook = async () => {
        if (!title || !author || !publishYear) {
            enqueueSnackbar('All fields are required', { variant: 'warning' });
            return;
        }

        const data = { title, author, publishYear: Number(publishYear) };

        setLoading(true);
        try {
            await axios.post('http://localhost:3001/books', data);
            enqueueSnackbar('Book Created Successfully', { variant: 'success' });
            navigate('/');
        } catch (error) {
            enqueueSnackbar('Error creating book', { variant: 'error' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl text-gray-500'>Title</label>
                    <input 
                        type='text' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2' 
                        disabled={loading}
                    />
                    <label className='text-xl text-gray-500 mt-4'>Author</label>
                    <input 
                        type='text' 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2' 
                        disabled={loading}
                    />
                    <label className='text-xl text-gray-500 mt-4'>Publish Year</label>
                    <input 
                        type='number' 
                        value={publishYear} 
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2' 
                        disabled={loading}
                    />
                </div>
                <button 
                    className='p-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
                    onClick={handleSaveBook}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default CreateBook;
