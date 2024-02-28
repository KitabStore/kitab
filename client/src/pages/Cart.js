import React, { useEffect,useState } from 'react';
import books from '../resources/mockCart.json';
import './styles/cart.css'
import { useSignedIn } from '../context/stateContext';
import { useNavigate } from 'react-router-dom';
import Order from '../components/checkoutModal';


const Cart = () => {
  const {signedIn} = useSignedIn();
  const navigate = useNavigate();
  const number = books.length;
  let sub = 0;
  const delivery = 5;

  useEffect(() => {
    if(!signedIn){
      navigate('/');
    }
  }, [navigate, signedIn])

  // Modal Components
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const itemDisplay = (book) => {
    return(
      <div className='row title' onClick={() => navigate(`/book/${book.isbn}`, {state: {book: book}})}>
        <div className='col-2'>
          <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg`} className="img rounded-1 mx-4 mx-md-0" alt={book.title} />
        </div>
        <div className='col-10 d-none d-md-block '>
          <div className='fs-5 text-truncate' title={book.author}>{book.title}</div>
          <div className='fs-6 text-dark-emphasis'>{book.author}</div>
        </div>
      </div>
    );
  }
  return (
    <div className='d-flex flex-column align-items-center my-5 mx-2'>
        <div className='mt-5 p-3 mb-5 h1'>
           Your Cart {number > 0 ? `[${number} Item ${number > 1 ? 's' : ''}]` : "is Empty"}
        </div>
        <div className='container container-fluid p-3 border border-dark rounded'>
          <div className='tHead row  border-dark border-bottom pb-2'>
            <div className='d-none d-md-block col-md-1'></div>
            <div className='col-3 col-md-3'>Title</div>
            <div className='col-2 col-md-2'>Price</div>
            <div className='col-2 col-md-2'>Quantity</div>
            <div className='col-2 col-md-2'>Total</div>
            <div className='col-2 col-md-2'>Remove</div>
            <div className='d-none d-md-block col-md-1'></div>
          </div>
          {books.map(book => {
            sub = sub + (book.quantity * book.price);
            return(
              <div className='tItems row d-flex align-items-center py-3' key={book.isbn}>
                <div className='col-md-1'></div>
                <div className='col-3'>{itemDisplay(book)}</div>
                <div className='col-2'>{book.price}$</div>
                <div className='col-2'>{book.quantity}</div>
                <div className='col-2'>{book.quantity * book.price} $</div>
                <div className='col-2'><i class="bi bi-trash-fill h6" onClick={() => alert("Item " + book.isbn + " Deleted")} title='Remove from Cart'></i></div>
                <div className='col-1'></div>
              </div>
            )
          })}

          <div className='container my-3 px-md-5 pt-3 border-dark border-top'>
            <div className='d-flex justify-content-between mx-md-5 mb-2'>
              <div>Subtotal:</div>
              <div>$ {sub.toFixed(2)}</div>
            </div>
            <div className='d-flex justify-content-between mx-md-5 mb-2'>
              <div>Delivery Fee:</div>
              <div>$ {delivery.toFixed(2)}</div>
            </div>
            <div className='d-flex justify-content-between border-top pt-2 mx-md-5 mb-2'>
              <div>Total:</div>
              <div>$ {(sub + delivery).toFixed(2)}</div>
            </div>
            <div className='d-flex justify-content-center'>
              <button className='btn border' onClick={() => handleShow()}>Checkout</button>
            </div>
          </div>
        </div>
        <Order show={show} total={(sub + delivery).toFixed(2)} count={number} handleClose={handleClose} books={books}></Order>
    </div>
  )
}
export default Cart;