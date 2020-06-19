import React from "react";

import axios from "axios";
import { useHistory } from 'react-router-dom'
export default function Home()
{
    const history = useHistory()

    const [book, setBook] = React.useState("");
    const [result, setResult] = React.useState([]);
    const [apiKey, setApiKey] = React.useState(
        "AIzaSyAz58YCnHUXfgr9qt-IacyDRMoxBGiLglY"
    );
    const [error, setError] = React.useState('');
    const [status, setStatus] = React.useState('');

    React.useEffect(() =>
    {
        var previous = sessionStorage.getItem('data')
        var q = sessionStorage.getItem('query')
        if (q != null) {
            setBook(q)
            setResult(JSON.parse(previous))
        }
    }, [])

    function handleChange(event)
    {
        const book = event.target.value;
        setBook(book);
        if (event.target.value === '') {
            setError("Enter book title,keyword to search book")
        } else {
            setError('')
        }
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        if (book === '') {
            setError("Enter book title,keyword to search book")
            return false
        }
        setStatus('Searching,please wait...')
        setError('')
        axios
            .get(
                "https://www.googleapis.com/books/v1/volumes?q=" +
                book +
                "&key=" +
                apiKey +
                "&maxResults=40"
            )
            .then(data =>
            {
                setStatus('')
                console.log(JSON.stringify(data.data.items));
                setResult(data.data.items);
                window.sessionStorage.setItem('data', JSON.stringify(data.data.items))
                window.sessionStorage.setItem('query', book)
                if (data.data.items.length === 0) {
                    setError('no result found')

                }
            }).catch(e =>
            {
                setError('Error getting the result')
                setStatus('')
            });
    }

    const goToDetails = (d) =>
    {
        history.push('/details', { 'link': d })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Book search app</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/havugapac/bookSearchApp" target='_blank'>Github</a>
                        </li>

                    </ul>
                </div>
            </nav>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: 50 }}><h3> Book search app using google books API and react </h3></div>

                    <div className="form-group">
                        <div className='d-flex'> <input
                            onChange={handleChange}
                            type="text"
                            value={book}
                            className="form-control mt-20"
                            placeholder="Enter the book's name"
                            autoComplete="off"
                        />
                            <button type="submit" className="btn btn-primary">
                                Search book
        </button>
                        </div>
                        <strong className='text-danger'>{error}</strong>
                        <strong className='text-success'>{status}</strong>
                    </div>
                </form>

                <div className='row'>
                    {result.map(book => (
                        <div className="col-md-12 col-lg-6">
                            <br />
                            <div>
                                <img src={book.volumeInfo.imageLinks != null && book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                            </div>
                            <div>
                                <p>
                                    Author: {book.volumeInfo.authors}
                                    <br />
              Title: {book.volumeInfo.title}
                                    <br />
              Publisher: {book.volumeInfo.publisher}
                                </p>

                                <button type="button" onClick={() => goToDetails(book.selfLink)} className="btn btn-success">
                                    More info
              </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
