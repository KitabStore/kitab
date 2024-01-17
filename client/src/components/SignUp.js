import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import data from '../resources/lb.json';
import { useRef } from 'react';
import { useSignedIn } from '../context/stateContext';
import apiURL from '../apiConfig';

const SignUp = (props) => {
  const { setSignedIn } = useSignedIn();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = ref1.current.value;
    const phone = ref2.current.value;
    const location = ref3.current.value;
    const email = ref4.current.value;
    const password = ref5.current.value;
    console.log(username, phone, location, email, password)
    fetch(`${apiURL}/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, phone, location, email, password })
    })
      .then(res => res.json())
      .then(data => {
          data.error.error  ? 
          toast.error(data.error.error, {
            autoClose: 2500,
            pauseOnHover: true,
            draggable: true,
          }) 
          :
          console.log(data.error.error);
          toast.success("Account Created Successfully")
        setSignedIn(data.logged);
        return data;
      })
      .catch(e => console.error(e))
    props.onHide();
  }
  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className='bg-dark border-0 rounded-0' closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark  rounded-0'>
        <form className='d-flex flex-column w-100' onSubmit={handleSubmit}>
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-fill"></i></span>
                    <input ref={ref1} name='username' type='text' className='form-control' title='Type your Username' placeholder='Username' aria-label="Username" aria-describedby="basic-addon1" required/>
                </div>
            </div>
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-telephone-fill"></i></span>
                    <span className="input-group-text" id="basic-addon1">+961</span>
                    <input ref={ref2} name='phone' type='text' className='form-control' title='Type your Phone number' placeholder='Phone' aria-label="Phone" aria-describedby="basic-addon1" required/>
                </div>
            </div>
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-geo-alt-fill"></i></span>
                    <select ref={ref3} class="form-select form-select-sm" aria-label="Location" title='Select your City' required>
                        {data.map(city => {
                          return (
                            <option value={city.city} key={city.city}>{city.city}</option>
                          )
                        })}
                    </select>
                </div>
            </div>
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i class="bi bi-envelope-at-fill"></i></span>
                    <input ref={ref4} name='email' type='email' className='form-control' title='Type your Email' placeholder='Email' aria-label="Email" aria-describedby="basic-addon1" required/>
                </div>
            </div>
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock-fill"></i></span>
                    <input ref={ref5} name='password' type='password' className='form-control' title='Type your Password' placeholder='Password' aria-label="Password" aria-describedby="basic-addon1" required/>
                </div>
            </div>
            <div>
                <button type='submit' className='btn bg-light border-0 rounded-1 text-dark' >SignUp</button>
            </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default SignUp;