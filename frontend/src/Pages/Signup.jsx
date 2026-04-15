import signupImg from "../assets/Images/signup.webp"
import Template from "../Component/Core/Auth/Template"


function Signup() {
  return (
    <div className='bg-[#000814]'>
        <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
    </div>
  )
}

export default Signup