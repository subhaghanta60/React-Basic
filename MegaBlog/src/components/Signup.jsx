import {useState} from 'react'
import authService, { AuthService } from '../appwrite/auth'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import {Button,Input,Logo} from "./index"
import { useForm } from 'react-hook-form'


function Signup() {
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const (register,handleSubmit) =useForm()

    const create = async(data) => {
        setError("");
        try {
            const userDate = await AuthService.createAccount(data);
            if(userDate){
                const currentUser =await authService.getCurrentUSer()
                if (currentUser) dispatch(login(currentUser))

                    navigate("/")
            }
            
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
            <div
             className='mb-2 flex justify-center'
            >
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%"/>

                </span>

            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign Up To Your Account
            </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                    Already  have any Account?
                    <Link
                     to="/login"
                     className='font-medium text-primary transition-allduration-200 hover:underline'
                    >
                        Sign In
                    </Link>

            </p>
            {error && <p className='text-red-600 mt-8 text-center'>
                 {error}
                </p>}
            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                        label="Name:"
                        type="text"
                        placeholder="Enter Your Name"
                        {...register("name", {
                            required:true
                        })}
                    />
                    <Input
                            label="Email :"
                            placeholder="Enter Your Email"
                            type="email"
                            {...register("email", {
                                required:true,
                                validate: {
                                    matchPattern : (value) => {
                                        /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.text(value) || "Email Address must be Valid address"
                                    }
                                }
                            })}

                     />

                    <Input
                            label="password: "
                            placeholder="Enter Your Password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                    />
                    <button
                        type='submit'
                        className='w-full'
                    >Create Account</button>

                </div>

            </form>
        </div>

    </div>
  )
}

export default Signup