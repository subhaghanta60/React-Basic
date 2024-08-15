import {useEffect,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {login as authLogin} from '../store/authSlice'
import {button,Input,Logo} from "./index"
import { useDispatch } from 'react-redux';
import service from '../appwrite/config';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate= useNavigate();
    const dispatch =useDispatch()
    const [register,handleSubmit] = useForm()
    const [error,setError] =useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await service.login(data)
            if(session){
                const userData = await service.getCurrentUSer();
                if(userData) dispatch(authLogin(userData));

                navigate("/")
            }
            
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />

                </span>
                
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign In To Your Account
            </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                    Donn't have any Account 
                    <Link
                     to="/signup"
                     className='font-medium text-primary transition-allduration-200 hover:underline'
                    >
                        SignUp
                    </Link>

            </p>
            {error && <p className='text-red-600 mt-8 text-center'>
                 {error}
                </p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
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
                       >Sign In</button>
                    </div>


                </form>

        </div>

    </div>
  )
}

export default Login