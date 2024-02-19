import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './navbar';
import { Newsitem } from "./newsitem";
import { Spinner } from "./loader";


export const FetchNews = () => {
    const location = useLocation();
    const query1 = new URLSearchParams(location.search).get('query');
    const query=encodeURIComponent(query1);
    const apiKey = "6a87d4e26bd04d989a0f62bd4e67b40f";
    const pageSize = 20;
    const bottomRef = useRef(null);

    const [author, setauthor] = useState(null);
    const [publishedAt, setpublishedAt] = useState(null);
    const [loadingstate, setloading] = useState(false);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(20);
    const [source, setsource] = useState(null);
    const [articles, setarticles] = useState([]);

    const getdata = () => {
        setloading(true);

        fetch(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apiKey}`)
            .then((res) => res.json())
            .then((res) => {
                setauthor(res.author);
                setpublishedAt(res.publishedAt);
                setloading(false);
                settotalResults(res.totalResults);
                setsource(res.source);
                setarticles(res.articles);

            })


    }
    useEffect(() => {
        getdata()
    }, [query]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [articles]);

    let nextClick = () => {
        if (Math.ceil((totalResults) / pageSize) > page) {
            const getdata = () => {
                setloading(true);

                fetch(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apiKey}`)
                    .then((res) => res.json())
                    .then((res) => {
                        setauthor(res.author);
                        setpublishedAt(res.publishedAt);
                        setsource(res.source);
                        setarticles(res.articles);

                    })
                setloading(false);
                setpage((page) => page + 1);
            };

            getdata();

        }

    }
    let prevClick = () => {

        const getdata = () => {
            setloading(true);

            fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`)
                .then((res) => res.json())
                .then((res) => {
                    setauthor(res.author);
                    setpublishedAt(res.publishedAt);
                    setsource(res.source);
                    setarticles(res.articles);

                })
            setloading(false);
            setpage((page) => page - 1);
        };

        getdata();

    }


    return (
        <>
            <Navbar />
            <div ref={bottomRef} className="container my-4 text-center pt-40">
                <br></br>
                <br></br>
                <br></br>
                {articles.length==0?<h2 className="md-10">NewsFeed - No Articles Found....</h2>:<h2 className="md-10">NewsFeed - Your Searched Articles</h2>}
                {loadingstate === true ? <Spinner /> : ""}
                <div className="row">
                    {loadingstate === false && articles.map((element) => {
                        return (
                            <div className="col-md-3" key={element.url}>
                                <Newsitem

                                    title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        );
                    })}

                </div>
                <div className="container my-3 d-flex justify-content-between">
                    <button type="button" disabled={page < 2} className="btn btn-dark" onClick={prevClick} > &larr; Previous</button>

                    <button type="button" disabled={page >= Math.ceil((totalResults) / pageSize)} className="btn btn-dark" onClick={nextClick}>  Next &rarr; </button>
                </div>
            </div>


        </>
    )
}
