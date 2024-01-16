import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import {Link} from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { TypeAnimation } from 'react-type-animation';


const Footer = () => {
    const [ref1, inView1] = useInView();
    const [ref2, inView2] = useInView();
    const [ref3, inView3] = useInView();
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            'service_7c8xrw6',
            'template_vlpsndh',
            form.current,
            'J_I3xhbLYiiQL2r1T'
        ).then(result => {
            toast.success('Sent Successfully!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            e.target.reset();
            console.log(result.text);
        }, (error) => {
            toast.error('An Error Occured, Try Again Later!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.error(error.text);
        })
    }
    return (
        <>
        <footer id="footer" className='container-fluid'> 
            <div className="col-lg-11 mt-3 mt-lg-0 mb-4 p-2 p-lg-0 container-fluid">
                <form id="contact" ref={form} onSubmit={sendEmail} className="email-form">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <input ref={ref1} type="text" name="from_name" className={`form-control ${inView1 && 'animate-falldown'}`} id="name" placeholder="Name" required />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input ref={ref2} type="email" className={`form-control ${inView2 && 'animate-falldown'}`} name="from_email" id="email" placeholder="Email" required />
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <textarea ref={ref3} className={`form-control ${inView3 && 'animate-falldown'}`} name="message" rows="8" placeholder="Message" required></textarea>
                    </div>
                    <div className="text-center"><button className="btn btn-dark mt-3" type="submit">Send Message</button></div>
                </form>
            </div>
            <div className="footer-top shadow-sm"> 
                <div className="container"> 
                    <div className="row">
                        <div className="col-lg-6 col-md-8">
                            <div className="footer-info">
                                <TypeAnimation
                                    sequence={['Thank you for Your Visit!',1000, 'We Would Love To Hear Your Feedback!', 1000]}
                                    wrapper='h1'
                                    speed={50}
                                    repeat={Infinity}
                                    omitDeletionAnimation={true}
                                    cursor={true}
                                    />
                                <div className="social-links my-3 container-fluid d-flex gap-5">
                                    <div><a className="text-white h3" href="https://twitter.com" target='_blank' rel='noopener noreferrer'> <i className="bi bi-twitter-x"></i></a></div>
                                    <div><a className="text-white h3" href="https://facebook.com" target='_blank' rel='noopener noreferrer'><i className="bi bi-facebook"></i></a></div>
                                    <div><a className="text-white h3" href="https://instagram.com" target='_blank' rel='noopener noreferrer'><i className="bi bi-instagram"></i></a></div>
                                    <div><a className="text-white h3" href="https://wa.me/+961123456" target='_blank' rel='noopener noreferrer'><i className="bi bi-whatsapp"></i></a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4 footer-links">
                            <h5 className=''>Useful Links</h5>
                            <div className='row mt-2 mb-4 mx-1'>
                                <div className='col col-12'><Link className='text-decoration-none text-white' to='/'>Home</Link></div>
                                <div className='col col-12'><a className='text-decoration-none text-white' href="#about">About us</a></div>
                                <div className='col col-12'><Link className='text-decoration-none text-white' to='/products'>Shop</Link></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> 
        </footer>
        </>
    )
}

export default Footer;