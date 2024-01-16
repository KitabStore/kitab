import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Truncate from '../components/Truncate';
import './styles/Book.css';

const Book = (props) => {
    const location = useLocation();
    const item = (location.state || location.state === "") ? location.state.book : null;
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState({});
    const [desc, setDesc] = useState();
    const [workId, setWorkId] = useState();
    const [toc, setTOC] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isbn10, setIsbn10] = useState();
    const [isbn13, setIsbn13] = useState();

    const getWorkId = () => {
        fetch(`https://openlibrary.org/isbn/${item?.isbn}.json`)
            .then(response => {
                if(!response.ok){
                    throw new Error('Network response is not ok');
                }
                return response.json()
            })
            .then(data => {
                setBook(data);
                setWorkId(data.works[0].key);
                setSubjects(data.subjects);
                setTOC(data.table_of_contents);
                setIsbn10(data.isbn_10[0]);
                setIsbn13(data.isbn_13[0]);
                return data;
            })
            .catch(error => console.error(error))
    }
    const getInfo = (id) => {
        fetch(`https://openlibrary.org${id}.json`)
            .then(response => response.json())
            .then(data => {
                setDesc(data.description.value?.split("--")[0]);
                return data;
            })
            .catch(error => console.error(error))
    }
    
    useEffect(() => {
        getWorkId()
        getInfo(workId)
        console.log("workd id: " + workId);
        console.log("Description: " + desc);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[workId, desc])

    useEffect(() => {
            window.scrollTo(0,0);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    const [nbr, setNbr] = useState(1);
  return (
    <div className='my-5 pt-3 container align-items-center'>
        { item !== null ? <>
        <div className='d-flex flex-column align-items-center align-items-md-start flex-md-row gap-5 mt-5'>
            <div className='cover-container d-flex justiry-content-center pt-md-4 mb-3 sticky-md-top'>
                <div className={loading ? 'placeholder-glow' : ''}>
                    <div className={loading ? 'mask book-cover bg-light placeholder rounded' : ''}>
                        <img src={`https://covers.openlibrary.org/b/isbn/${item.isbn}-L.jpg`} className="img cover-img" alt={item.title} height={400} onLoad={() => setLoading(false)}/>
                    </div>
                    <div className='fs-4 mt-2'>
                        <span className='text-dark-emphasis'>Quantity in Stock:</span> {item.quantity}
                    </div>
                    <div className='fs-4 mt-2'><span className='text-dark-emphasis'>Price:</span> {item.price}$</div>
                    <form className="input-group mt-2">
                        <input type="number" className="form-control col-6" min="1" max={item.quantity} id="nbr" value={nbr} onChange={(e) => setNbr(e.target.value)} required/>
                        <input className='btn btn-submit border roundede-5' value="Add to Cart" type='submit' title='Add to Cart' onClick={(e) => {e.preventDefault()}}/>
                    </form>
                </div>
            </div>
            <div className='info-container mx-1 pt-md-3 container-fluid'>
                <div className="rounded-2 container-fluid" tabIndex="0">
                    <div>
                        <div className='fs-1'>{item.title}</div>
                        <div className='fs-5 pb-2 ps-1'>by <span className='fs-3 text-dark-emphasis'>{item.author}</span></div>
                        <div className='fs-4 border-top pt-2'>{desc ? <Truncate >{desc}</Truncate> : <span className='fs-6 text-dark-emphasis'>Description not Available for This Book</span>}</div>
                    </div>
                    <div className="card text-start my-3 bg-black text-white border">
                        <div className="card-header h2 border-bottom">
                            Book Details
                        </div>
                        <div className="card-body">
                            {
                            toc !== undefined && 
                            <>
                                <h4 className="card-title">Table of Content:</h4>
                                <Truncate className="card-text"> 
                                    {
                                        toc.map((content, index) => 
                                            <span key={index} >
                                                <span className='fs-5 text-dark-emphasis'>Chapter {index+1}: </span>{content.title}<br/>
                                            </span>
                                        )
                                    }
                                </Truncate>
                            </>
                            }

                                    <h4 className='card-title'>Physical Format: </h4>
                                    <p className="card-text">Paper Back</p>

                                    <h4 className='card-title'>Category: </h4>
                                    <p className="card-text">{item.category}</p>



                            {
                                book.number_of_pages && 
                                <>
                                    <h4 className='card-title'>Number of pages: </h4>
                                    <p className="card-text">{book.number_of_pages}</p>
                                </>
                            
                            }


                            {
                                book.publish_date && 
                                <>
                                    <h4 className='card-title'>Publish Date: </h4>
                                    <p className="card-text">{book.publish_date}</p>
                                </>
                            
                            }


                            {
                                subjects !== undefined && 
                                <>
                                    <h4 className="card-title">Subjects:</h4>
                                    <p className="card-text">{subjects.map((subj, index) => <span>{subj}<br/></span>)}</p>
                                </>
                            }

                            
                            <h4 className="card-title">ID Numbers:</h4>
                            {
                                isbn10 !== undefined && <>
                                <p className="card-text">ISBN {item.isbn.length === 13 ? <>{"10: "+ isbn10}</> : <>{"13: "+ isbn13}</>}</p>
                                </>
                            }   <p className="card-text">ISBN {item.isbn.length === 13 ? "13" : "10"}: {item.isbn}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> : 
        <div className='text-danger mt-5 py-5 rounded-3 placeholder-wave d-flex gap-3 justify-content-center'>
            <i className='bi bi-exclamation-circle-fill h1'></i>
            <div className='h1'>This page is not found</div>
        </div>}
    </div>
  )
}

export default Book;