import './styles/Products.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import ProductsPlaceholder from '../components/ProductsPlaceholder';
import apiUrl from '../apiConfig';

const Products = () => {

    const [loading, setLoading] = useState(true);
    // Page Load Logic
    const location = useLocation();
    const cat = location.state? location.state.cat : "all";
    const [category, setCategory] = useState(cat);
    useEffect(() => {
        window.scrollTo(0,0);
        const radio = document.getElementById(category);
        radio.checked = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Category Change Logic
    const handleChange = (e) => {
        setCurrentPage(1);
        setCategory(e.target.value);
        setLoading(true);
    }

    // Search Logic
    const [search, setSearch] = useState("");
    const handleSearch = e => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }
    useEffect(() => {
        fetch(`${apiUrl}/search/${search}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data.data)
            })
            .catch(error => console.error(error))
    }, [search])

    // Fetching Books logic
    const [books, setBooks] = useState([]);
    useEffect(() => {
        if(category !== "all"){
            fetch(`${apiUrl}/postBooks`, {
                method: 'POST',
                headers:{
                    'Content-type': "application/json"
                },
                body: JSON.stringify({category})
            })
                .then(res => res.json())
                .then(data => {
                    setBooks(data.data);
                    return data;
                })
                .then(data => setTimeout(() => {
                    setLoading(false)
                }, 2000))
                .catch(error => console.error(error))
        }else{
            fetch(`${apiUrl}/postBooks`, {
                method: 'POST'
            })
                .then(res => res.json())
                .then(data => {
                    setBooks(data.data);
                    return data;
                })
                .then(data => setTimeout(() => {
                    setLoading(false)
                }, 1000))
                .catch(error => console.error(error))
        }
        
    }, [category])




    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars 
    const [postsPerPage, setPostsPerPage] = useState(18);
    let lastPostIndex = currentPage * postsPerPage;
    let firstPostIndex = lastPostIndex - postsPerPage;

    const sliced = books.slice(firstPostIndex, lastPostIndex);

    const navigate = useNavigate();

    return(
        <>
            <div className='d-flex flex-columns align-items-center mt-5 mb-3 justify-content-center'>
                <div className='mt-5 p-3 mb-5 h1'>
                    {!(category === "all") ? 'Books in ' + category : "All Books"}
                </div>
            </div>
            <div className='whole container d-flex flex-column flex-md-row justify-content-center gap-3 mb-5'>
                <div className='leftPanel d-flex flex-column gap-5 mb-4'>
                    <div className=''>
                        <input className='form-control' name='search' type='text' placeholder='Search' onChange={handleSearch}/>
                    </div>
                    <div className='d-flex flex-column gap-1'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" id="all" value="all" onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="all">
                                All Products
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" id="fiction" value="fiction" onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="fiction">
                                Fiction
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" id="non-fiction" value="non-fiction" onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="non-fiction">
                                Non-Fiction
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" id="self-help" value="self-help" onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="self-help">
                                Self-Help
                            </label>
                        </div>
                    </div>
                </div>
                <div className='mainPanel container-fluid col-md-10 p-0'>
                        {loading ? <ProductsPlaceholder postsPerPage={postsPerPage} /> : 
                            <div className='row p-0'> {
                                sliced.map((book, index) => {
                                    if(book.isbn === null) book.isbn = index;
                                    return(
                                        <div className='col-6 col-sm-4 col-lg-2' key={book.isbn} title={book.title} 
                                            onClick={() => navigate(`/book/${book.isbn}`, {state: {book: book}})}>
                                            <div className='card loaded bg-dark mb-3'>
                                                <div className='mask'>
                                                    <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} className="card-img-top img" alt={book.title} height={250}/>
                                                </div>
                                                <div className="card-body">
                                                    <h6 className="card-title placeholder-glow text-white d-block text-truncate">{book.title}</h6>
                                                    <div className="card-text text-dark-emphasis d-block m-0 text-truncate">{book.author}</div>
                                                    <div className="card-text text-dark-emphasis d-block m-0 text-truncate">{book.price}$</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    <div className='row'>
                        {(books.length > postsPerPage && !loading) && <Pagination totalPosts={books.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                    </div>
                </div>
            </div>
            <div className='go-top' ><a className="h1" href='#top'><i className='bi bi-arrow-up-square'></i></a></div>
        </>
    )
}
export default Products;
