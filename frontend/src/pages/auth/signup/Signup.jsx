import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import "./Signup.css";
import GenderCheckbox from "../../../components/GenderCheckBox";
import StudyCheckBox from "../../../components/StudyCheckBox";
import useSignup from "../../../hooks/useSignup";

const Signup = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNo: '',
        day: '',
        month: '',
        year: '',
        gender: '',
        studyingFor: ''
    });

    const { loading, signup } = useSignup();

    const handleGenderCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
        console.log(gender);
    }

    const handleStudyCheckboxChange = (studyingFor) => {
        setInputs({ ...inputs, studyingFor });
        console.log(studyingFor);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className="container signup">
            <div className="container signupHeader">
                <img src="logo.jpg" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <h3 className="container">Signup</h3>
                    <label><FaUser /> Name</label>
                    <input type="text" placeholder="Enter Name"
                        value={inputs.name}
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                    <label><MdEmail /> Email</label>
                    <input type="email" placeholder="Enter Email"
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                    <label><RiLockPasswordFill /> Password</label>
                    <input type="password" placeholder="Enter Password"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                    <label><RiLockPasswordFill /> Confirm Password</label>
                    <input type="password" placeholder="Confirm Password"
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
                    <label><FaPhoneAlt /> Contacts</label>
                    <input type="text" placeholder="Enter Mobile number"
                        value={inputs.mobileNo}
                        onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })} />
                    <label><FaCalendarAlt /> Birth Day</label>
                    <input type="text" placeholder="Enter your Birth Day"
                        value={inputs.day}
                        onChange={(e) => setInputs({ ...inputs, day: e.target.value })} />
                    <label><FaCalendarAlt /> Birth Month</label>
                    <input type="text" placeholder="Enter your Birth Month"
                        value={inputs.month}
                        onChange={(e) => setInputs({ ...inputs, month: e.target.value })} />
                    <label><FaCalendarAlt /> Birth Year</label>
                    <input type="text" placeholder="Enter your Birth Year"
                        value={inputs.year}
                        onChange={(e) => setInputs({ ...inputs, year: e.target.value })} />
                    <label><FaTransgender /> Gender</label>
                    <GenderCheckbox onCheckboxChange={handleGenderCheckboxChange} selectedGender={inputs.gender} />
                    <label><PiBooksFill /> Enrolling For</label>
                    <StudyCheckBox onCheckboxChange={handleStudyCheckboxChange} selectedGender={inputs.studyingFor} />
                    <button className="btn loginBtn signupBtn" disabled={loading}>Signup</button>
                    <Link className="link signupLink" to="/login">Already have an account? Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;