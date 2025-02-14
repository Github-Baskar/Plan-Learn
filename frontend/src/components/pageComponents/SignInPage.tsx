import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Divider as AntDivider } from 'antd';

import { SignInErrorMsgType } from "../../types";
import { AppDispatch, authUser, RootState } from "../../store";
import { formatLabel, validateForm } from "../../utilities/commonFunction";

import Button from "../baseComponents/Button";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { EyeOpenIcon } from "../../icons/EyeOpenIcon";
import { EyeCloseIcon } from "../../icons/EyeCloseIcon";

const SignInPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [user, setUser] = useState<TokenResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOauthLoading, setOauthIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errorMsg, setErrorMsg] = useState<SignInErrorMsgType>({
        email: '',
        password: ''
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
        if (isFormValid) {
            signInUser(formData, setIsLoading);
        } else {
            setErrorMsg((prev) => ({ ...prev, ...errorMsg }));
            setIsLoading(false)
        }
    }
    const signIn = useGoogleLogin({
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
                    signInUser(res.data, setOauthIsLoading);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);
    const signInUser = async (data: { [key: string]: string }, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        const { email, password, picture } = data
        if (email && password) {
            await dispatch(authUser({ email, password }, navigate))
        } else if (email && picture) {
            setIsLoading(true);
            await dispatch(authUser({ email }, navigate, picture));
        }
        resetField();
        setIsLoading(false);
    }
    const resetField = () => {
        setFormData({
            email: '',
            password: '',
        })
        setErrorMsg({
            email: '',
            password: '',
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
                    <Button
                        type='Submit'
                        className='bg-[#00bcd4] text-[#fff] uppercase hover:!text-[#00bcd4] border-[#00bcd4] focus-visible:outline-0 rounded-md py-4 lg:py-5 text-sm/6 font-semibold w-full'
                        loading={isLoading}
                        onClick={() => setIsLoading(true)}
                    >
                        Sign in
                    </Button>
                </form>
                <AntDivider><small>or sign in with</small></AntDivider>
                <Button
                    className='border !border-black rounded-md py-4 lg:py-5 text-sm/6 font-semibold w-full hover:!bg-[rgba(0,58,228,.04)]'
                    loading={isOauthLoading}
                    icon={<GoogleIcon />}
                    onClick={() => {
                        signIn();
                    }}
                >
                    Continue with Google
                </Button>
                <p className='text-[0.8rem] sm:text-[0.9rem] lg:text-[1rem] text-center mt-4'>Don't have an account?<NavLink to='/sign-up' className={`text-[#00bcd4] ps-1 underline hover:text-[rgba(3,169,244,0.7)]`}>Sign up</NavLink></p>
            </div>
        </div>
    )
}

export default SignInPage