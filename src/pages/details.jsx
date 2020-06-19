import React from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";

export default function Details(props)
{
    const history = useHistory()
    const link = history.location.state.link
    console.log(link)

    const [data, setData] = React.useState({})
    const [error, setError] = React.useState('loading')

    React.useEffect(() =>
    {
        axios
            .get(
                link
            )
            .then(data =>
            {
                console.log(JSON.stringify(data.data));
                setData(data.data);
                setError('complete')
                if (data.data === 0) {
                    setError('no result found')

                }
            }).catch(e =>
            {
                setError('Error getting the result')

            });
    }, [])

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

                {
                    error === 'loading' ? <div style={{ margin: 50 }}>
                        <h4 className='text-success'>Please wait while loading book details...</h4>
                    </div> : error === 'complete' ? <div className='row mt-5'>
                        <div className='col-sm-12 col-lg-5'>
                            <img src={data.volumeInfo.imageLinks != null && data.volumeInfo.imageLinks.thumbnail} />
                        </div>
                        <div className='col-sm-12 col-lg-5'>
                            <h3>{data.volumeInfo.title}</h3>
                            <p>Authors: {data.volumeInfo.authors.map(a => (a + ','))}</p>
                            <p>Publisher:<b>{data.volumeInfo.publisher}</b></p>
                            <p>{data.volumeInfo.description}</p>
                        </div>
                    </div> : <div>
                                <h4 className='text-danger'>{error}</h4>
                            </div>
                }

            </div>
        </div>
    )
}