import Modal from 'react-bootstrap/Modal';
import './styles/modals.css';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useSignedIn } from '../context/stateContext';
import apiURL from '../apiConfig';


const SignIn = (props) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const { setSignedIn } = useSignedIn();
    const handleSubmit = (e) => {
      e.preventDefault();
      const username = ref1.current.value;
      const password = ref2.current.value;
      console.log(username, password)
      fetch(`${apiURL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
        .then(res => res.json())
        .then(data => {
          data.error ? 
            toast.error(data.error, {
              autoClose: 2500,
              pauseOnHover: true,
              draggable: true,
            }) :
            toast.success("Signed In Successfully")
          setSignedIn(data.logged);
        })
        .catch(error => console.error(error))
      props.onHide();
    }
  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className='bg-dark border-0 rounded-0' closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        <form onSubmit={handleSubmit}>
            <div className='d-flex flex-column w-100'>
                <div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-fill"></i></span>
                        <input ref={ref1} name='username' type='text' className='form-control' placeholder='Username' aria-label="Username" aria-describedby="basic-addon1" required/>
                    </div>
                </div>
                <div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock-fill"></i></span>
                        <input ref={ref2} name='password' type='password' className='form-control' placeholder='Password' aria-label="Username" aria-describedby="basic-addon1" required/>
                    </div>
                </div>
            </div>
            <div>
                <button type='submit' className='btn bg-light border-0 rounded-1 text-dark'>SignIn</button>
            </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='bg-dark border-0 rounded-0 d-flex align-items-center justify-content-center'>
        <p>Don't have an account?<span onClick={props.onHide}><span className='create bg-none mx-1' onClick={props.signup}>Create one</span></span></p>
      </Modal.Footer>
    </Modal>
  );
}
export default SignIn;