import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3001/books/${id}`)
            .then((res) => {
                setBook(res.data);
            })
            .catch((error) => {
                console.error("Error fetching book:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Show Book</h1>
            {book ? (
                <div className="flex flex-col border border-sky-400 rounded-xl w-fit p-4 shadow-lg">
                    <div className="my-2">
                        <span className="text-xl mr-4 text-gray-500">Id:</span>
                        <span>{id}</span>
                    </div>
                    <div className="my-2">
                        <span className="text-xl mr-4 text-gray-500">Title:</span>
                        <span>{book.title || "N/A"}</span>
                    </div>
                    <div className="my-2">
                        <span className="text-xl mr-4 text-gray-500">Author:</span>
                        <span>{book.author || "N/A"}</span>
                    </div>
                    <div className="my-2">
                        <span className="text-xl mr-4 text-gray-500">Publish Year:</span>
                        <span>{book.publishYear || "N/A"}</span>
                    </div>
                    <div className="my-2">
                        <span className="text-xl mr-4 text-gray-500">Created At:</span>
                        <span>{book.createAt ? new Date(book.createAt).toLocaleString() : "N/A"}</span>
                    </div>
                    <div className="my-2">
                        <span className="text-xl mr-4 text-gray-500">Last Updated:</span>
                        <span>{book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "N/A"}</span>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">Book not found.</p>
            )}
        </div>
    );
};

export default ShowBook;
