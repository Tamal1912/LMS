import React, { useState } from "react";
import "../../index.css";
import {Link} from "react-scroll"
import { Button, Modal } from "flowbite-react";
import { useNavigate } from 'react-router-dom';




const Home = () => {

  const [openSignUpModal,setOpenSignUpModal]=useState(false)
  const [openLoginModal,setOpenLoginModal]=useState(false)
  const navigate=useNavigate()
  return (
    <>
      <div name="welcome" className="navbar h-24 w-full flex flex-wrap justify-evenly">
        <h1 className="text-4xl font-mono">LOGO</h1>
        <nav className="border-none bg-slate-900 text-white font-light tracking-wide h-16 w-2/4 rounded-lg flex justify-center list-none gap-4 text-2xl">
            <Link className="hover:underline" to="why-section" smooth={true} duration={600}>Why</Link>
            <Link className="hover:underline" to="features-section"smooth={true} duration={500}>Features</Link>
            <Link className="hover:underline" to="contact-section"smooth={true} duration={500}>Contact Us</Link>
        
        </nav>
        <Button color="blue" onClick={()=>setOpenLoginModal(true)} className="login  btn-xs sm:btn-sm md:btn-md lg:btn-md">
          Login/Signup
        </Button>
        <Modal show={openLoginModal} size="3xl" onClose={() => setOpenLoginModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
           
            <div className="flex justify-center gap-4">
              <Link onClick={()=>navigate("/api/teacherLoginSignup")}>
              <Button color="blue" onClick={() => setOpenLoginModal(false)}>
               As Teacher
              </Button>
              </Link>

              <Link onClick={()=>navigate("/api/studentLoginSignup")}>
              <Button color="lime" onClick={() => setOpenLoginModal(false)}>
              As Student
              </Button>
              </Link>
            </div>
          </div>
        </Modal.Body>
        </Modal>

        {/* <Button color="blue" onClick={()=>setOpenSignUpModal(true)} className="signup btn-xs sm:btn-sm md:btn-md lg:btn-md">
          SignUp
        </Button>
        <Modal show={openSignUpModal} size="3xl" onClose={() => setOpenSignUpModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
           
            <div className="flex justify-center gap-4">
              <Button color="blue" onClick={() => setOpenSignUpModal(false)}>
                {"Signup as Teacher"}
              </Button>
              <Button color="green" onClick={() => setOpenSignUpModal(false)}>
              Signup as Student
              </Button>
            </div>
          </div>
        </Modal.Body>
        </Modal> */}

      </div>

      <div  className="welcome mb-10 bg-gradient-to-r from-sky-500 to-rose-600 rounded-xl h-[400px] w-4/5 mt-32 mx-auto flex items-center justify-center relative shadow-lg overflow-hidden">
        <h1 className="main-message text-[120px] font-extrabold text-white tracking-wide animate-slideInLeft">
          Welcome
        </h1>
        <p className="sub-message text-3xl text-white absolute bottom-10 right-10 animate-slideInRight opacity-90">
          Explore the Best Features
        </p>
      </div>
      <h2 className="divider text-3xl font-bold text-center mb-10">Why</h2>

      <div name="why-section" className="feedback bg-[#ebebeb] py-20 px-8 ">
        <div className="cards w-full h-auto gap-6 flex flex-wrap justify-evenly relative">
          <div className="card w-[350px] shadow-xl bg-white">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="https://plus.unsplash.com/premium_photo-1677171749355-4ad563d86165?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHN0dWRlbnRzfGVufDB8fDB8fHww"
                alt="Students"
              />
            </figure>
          </div>
          <div className="card bg-[#edf2fb] w-[350px] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                className="max-h-60 min-w-full"
                src="https://plus.unsplash.com/premium_photo-1723600989490-59ffbbb12acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHN0dWRlbnRzJTIwd2l0aCUyMGxhcHRvcHN8ZW58MHwwfDB8fHww"
                alt="Shoes"
              />
            </figure>
          </div>
          <div className="card bg-white w-[350px] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="https://plus.unsplash.com/premium_photo-1681505320322-b5576b25303b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHRlYWNoZXJzJTIwd2l0aCUyMHN0dWRlbnRzfGVufDB8fDB8fHww"
                alt="Shoes"
              />
            </figure>
          </div>
          <div className="card bg-[#edf2fb] w-[350px] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Shoes"
              />
            </figure>
          </div>
          <div className="card  bg-[#edf2fb] w-[350px] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                className="h-[255px]"
                src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9ubGluZSUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Shoes"
              />
            </figure>
          </div>
        </div>
      </div>

      <div name="features-section" className="roles bg-white py-14 px-8">
        <h2 className="text-5xl tracking-wide font-bold text-center mb-16">
          Role Based Access <br /> Better Management
        </h2>

        <div className="py-4 rounded-md bg-gradient-to-b from-sky-500 to-black max-h-screen  w-5/6 relative left-32 flex justify-evenly flex-wrap">
          <div className="card bg-base-100 image-full w-72 h-60 shadow-md shadow-black">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1543269865-f576bdee5d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHN0dWRlbnQlMjB3aXRoJTIwbGFwdG9wfGVufDB8MHwwfHx8MA%3D%3D"
                alt="Students"
              />
            </figure>
            <div className="student card-body text-center">
              <h2 className="card-title text-2xl text-white font-semibold absolute left-44 top-48">Students</h2>
            </div>
          </div>
          <h2 className="text-[40px] font-semibold text-white">For students, there will be a <br />choice of verifications <br />and huge access for the academics works</h2>

        <hr className="m-2 border-dotted border-2 w-full "/>
            <h2 className="text-[40px] font-semibold text-white tracking-normal ">For Teacher, there will be a <br />choice of verifications <br />and huge access for the academics works</h2>
          <div className="teacher card bg-base-100 image-full w-72 h-60 shadow-md shadow-white">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHRlYWNoZXIlMjB3aXRoJTIwbGFwdG9wfGVufDB8MHwwfHx8MA%3D%3D"
                alt="Teachers"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title text-2xl text-white font-semibold absolute  top-48">Teachers</h2>
            </div>
          </div>
        </div>
      </div>

      <div name="contact-section" className="footer bg-gray-100 py-10 px-8">
      <footer className="footer footer-center bg-slate-300  rounded p-20 text-lg text-black text-bold">
  <nav className="grid grid-flow-col gap-4 ">
    <Link to="welcome" className="link link-hover">Back To Top</Link>
    <a className="link link-hover">Contact</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved pvt ltd</p>
  </aside>
</footer>
      </div>
    </>
  );
};

export default Home;