import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Divider as AntDivider } from 'antd';
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google';
import Button from "../baseComponents/Button";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { EyeOpenIcon } from "../../icons/EyeOpenIcon";
import { EyeCloseIcon } from "../../icons/EyeCloseIcon";
import { formatLabel, validateForm } from "../../utilities/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, registerUser, RootState } from "../../store";
import axios from "axios";
import { SignUpErrorMsgType } from "../../types";

const SignUpPage = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [user, setUser] = useState<TokenResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOauthLoading, setOauthIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errorMsg, setErrorMsg] = useState<SignUpErrorMsgType>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name,
            value = e.target.value && e.target.value.trim() || '';

        if (value) {
            let error = validateForm(formData, name, value);
            if (error) {
                setErrorMsg(prev => ({ ...prev, [name]: error }))
            } else {
                setErrorMsg(prev => ({ ...prev, [name]: '' }))
            }
        } else {
            setErrorMsg(prev => ({ ...prev, [name]: `${formatLabel(name)} field is required.` }))
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorMsg: { [key: string]: string } = {}
        let isFormValid = true;
        Object.entries(formData).forEach(([name, value]) => {
            value = value.trim();
            if (value) {
                let error = validateForm(formData, name, value);
                if (!isFormValid || error)
                    isFormValid = false;
                error ? errorMsg[name] = error : errorMsg[name] = ''
            } else {
                if (!isFormValid)
                    isFormValid = false;
                errorMsg[name] = `${formatLabel(name)} field is required.`
            }
        });
        
        console.log(isFormValid, "submit")
        if (isFormValid) {
            signUpUser(formData, setIsLoading);
        } else {
            setErrorMsg((prev) => ({ ...prev, ...errorMsg }));
            setIsLoading(false)
        }
    }
    const signup = useGoogleLogin({
        onSuccess: (codeResponse: TokenResponse) => setUser(codeResponse),
        onError: (error: unknown) => console.log('Login Failed:', error)
    });
    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);
    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    signUpUser(res.data, setOauthIsLoading, user.access_token);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);
    const signUpUser = async (data: { [key: string]: string }, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, ...rest: string[]) => {
        const { name, email, password, confirmPassword } = data
        const [token] = rest
        if (name && email && token) {
            await dispatch(registerUser({ name, email, authType: user?.access_token ? 'oauth' : 'password' }, navigate))
        } else if (name && email && password === confirmPassword) {
            await dispatch(registerUser({ name, email, password, authType: 'password' }, navigate))
        }
        resetField();
        setIsLoading(false);
    }
    const resetField = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        setErrorMsg({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }
    return (
        <div className="auth-page-wrapper flex flex-1 flex-col justify-center bg-gray h-[100vh]">
            <div className="bg-white shadow-md rounded-lg sm:mx-auto sm:w-full sm:max-w-[480px] px-4 py-12 sm:px-12">
                <h1 className='text-[0.8rem] sm:text-[1rem] lg:text-[1.5rem] text-center uppercase tracking-[3px] font-[800]'>Plan & Learn</h1>
                <form className="mt-8" onSubmit={(e) => onSubmitHandler(e)}>
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                className="border border-[#6b7280] outline-none rounded-md text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] z-10 px-[11px] w-full"
                                name="name"
                                placeholder="Enter name"
                                autoComplete={'off'}
                                onChange={(e) => onChangeHandler(e)}
                                value={formData.name}
                            />
                        </div>
                        <small className={"error mt-0.5 text-xs lg:text-sm font-[500] text-red-600 absolute"}>{errorMsg.name}</small>
                    </div>
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="email"
                                className="border border-[#6b7280] outline-none rounded-md text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] z-10 px-[11px] w-full"
                                name="email"
                                placeholder="Enter email"
                                autoComplete={'off'}
                                onChange={(e) => onChangeHandler(e)}
                                value={formData.email}
                            />
                        </div>
                        <small className={"error mt-0.5 text-xs lg:text-sm font-[500] text-red-600 absolute"}>{errorMsg.email}</small>
                    </div>
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name={"password"}
                                id={"password"}
                                className={`border border-[#6b7280] outline-none rounded-md text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] z-10 px-[11px] w-full`}
                                placeholder={"Enter password"}
                                autoComplete={'off'}
                                onChange={(e) => onChangeHandler(e)}
                                value={formData.password}
                            />
                            {
                                showPassword ?
                                    <span className="absolute right-3 top-3 md:top-4" onClick={() => setShowPassword(false)}>
                                        <EyeOpenIcon />
                                    </span> :
                                    <span className="absolute right-3 top-3 md:top-4" onClick={() => setShowPassword(true)}>
                                        <EyeCloseIcon />
                                    </span>
                            }
                        </div>
                        <small className={"error mt-0.5 text-xs lg:text-sm font-[500] text-red-600 absolute"}>{errorMsg.password}</small>
                    </div>
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name={"confirmPassword"}
                                id={"confirmPassword"}
                                className={`border border-[#6b7280] outline-none rounded-md text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] z-10 px-[11px] w-full`}
                                placeholder={"Enter confirm password"}
                                autoComplete={'off'}
                                onChange={(e) => onChangeHandler(e)}
                                value={formData.confirmPassword}
                            />
                            {
                                showConfirmPassword ?
                                    <span className="absolute right-3 top-3 md:top-4" onClick={() => setShowConfirmPassword(false)}>
                                        <EyeOpenIcon />
                                    </span> :
                                    <span className="absolute right-3 top-3 md:top-4" onClick={() => setShowConfirmPassword(true)}>
                                        <EyeCloseIcon />
                                    </span>
                            }
                        </div>
                        <small className={"error mt-0.5 text-xs lg:text-sm font-[500] text-red-600 absolute"}>{errorMsg.confirmPassword}</small>
                    </div>
                    <Button
                        type='Submit'
                        className='bg-[#03A9F4] text-[#fff] uppercase hover:!bg-[rgba(3,169,244,0.7)] hover:!text-[#fff] focus-visible:outline-0 border-0 rounded-md py-4 lg:py-5 text-sm/6 font-semibold w-full'
                        loading={isLoading}
                        onClick={() => {setIsLoading(true); console.log("click")}}
                    >
                        Sign up
                    </Button>
                </form>
                <AntDivider><small>or sign up with</small></AntDivider>
                <Button
                    className='border border-black rounded-md py-4 lg:py-5 text-sm/6 font-semibold w-full hover:bg-[rgba(0,58,228,.04)]'
                    loading={isOauthLoading}
                    icon={<GoogleIcon />}
                    onClick={() => {
                        setOauthIsLoading(true);
                        signup();
                    }}
                >
                    Continue with Google
                </Button>
                <p className='text-[0.8rem] sm:text-[0.9rem] lg:text-[1rem] text-center mt-4'>Have an account?<NavLink to='/sign-in' className={`text-[#03A9F4] ps-1 underline hover:text-[rgba(3,169,244,0.7)]`}>Sign in</NavLink></p>
            </div>
        </div>
    )
}

export default SignUpPage