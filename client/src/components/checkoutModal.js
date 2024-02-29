import React from 'react';
import Modal from 'react-bootstrap/Modal';

const checkoutModal = (props) => {
  return (
    <div>
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
        <Modal.Header
            className='bg-dark' closeButton>
          <Modal.Title>Your Order: books[0].orderid</Modal.Title>
        </Modal.Header>
        <Modal.Body
            className='bg-dark'>
          {props.books.map((book, index) =>{
            return(
              <p key={book.isbn}>{index}. {book.title}</p>
            )
          })}
          <h2>Total Price: {props.total} $</h2>
        </Modal.Body>
        <Modal.Footer
            className='bg-dark'>
          <button className='btn border' onClick={props.handleClose}>
            No
          </button>
          <button className='btn border'>Order</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default checkoutModal;