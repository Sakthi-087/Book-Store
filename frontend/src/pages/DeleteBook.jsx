import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteBook = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3001/books/${id}`);
            enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
            navigate('/');
        } catch (error) {
            enqueueSnackbar('Error deleting book', { variant: 'error' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-xl my-4'>Delete Book</h1>
            {loading && <Spinner />}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <button
                    className='p-4 bg-red-600 text-white m-8 w-full hover:bg-red-700 transition duration-300'
                    onClick={handleDeleteBook}
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : 'Yes, Delete It'}
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;
