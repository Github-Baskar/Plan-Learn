import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Drawer as AntDrawer } from "antd";

import { AppDispatch, RootState, signoutUser } from "../../store";
import NavMenuList from "./NavMenuList";

import Button from "../baseComponents/Button";
import ProfileLogo from "../baseComponents/ProfileLogo";
import MenuIcon from "../../icons/MenuIcon";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <nav className="flex justify-center items-center sticky top-0 z-[100] h-[80px] shadow-md bg-white">
            <div className="header-content flex justify-between items-center w-[100%] md:w-[90%] lg:w-[80%] p-4 md:p-0">
                <h1 className='text-base lg:text-lg uppercase tracking-[3px] font-[800] text-[#00bcd4] cursor-pointer' onClick={()=>navigate('/')}>Plan & Learn</h1>
                <div className="hidden md:block">
                    <NavMenuList
                        isLoading={isLoading}
                        userInfo={userInfo}
                        signout={() => {
                            setIsLoading(true);
                            dispatch(signoutUser(navigate));
                        }}
                    />
                </div>
                <button
                    className={'btn md:hidden bg-transparent border-0 p-0'}
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <MenuIcon />
                </button>
                <AntDrawer
                    title={
                        <h1 className='text-base lg:text-lg text-[#00bcd4] uppercase tracking-[3px] font-[800] my-3 cursor-pointer' onClick={()=>navigate('/')}>Plan & Learn</h1>
                    }
                    placement={'right'}
                    closable={false}
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                    key={'right'}
                    className={'md:hidden'}
                    width={300}
                    footer={
                        <div className="flex justify-between items-center">
                            <div className="flex items-center cursor-pointer" title={userInfo?.name || 'Guest User'}>
                                <ProfileLogo
                                    imageURL={userInfo?.picture || ''}
                                    name={userInfo?.name || 'Guest User'}
                                />
                                <div className="ms-2">
                                    <p className='font-semibold text-[#333] text-[1rem] tracking-[1px]'>{userInfo?.name || 'Guest User'}</p>
                                </div>
                            </div>
                            {
                                userInfo?.name ?
                                    <Button
                                        className='btn !border-[#00bcd4] !text-[rgb(0,188,212)] bg-[rgba(0,188,212,.1)] hover:!bg-[rgba(0,188,212,.2)] text-sm md:text-base px-4 py-2 w-fit h-[30px]'
                                        loading={isLoading}
                                        onClick={() => {
                                            setIsLoading(true);
                                            setIsDrawerOpen(false);
                                            dispatch(signoutUser(navigate));
                                        }}
                                    >
                                        Sign out
                                    </Button> :
                                    <Button
                                        className='btn !border-[#00bcd4] !text-[rgb(0,188,212)] bg-[rgba(0,188,212,.1)] hover:!bg-[rgba(0,188,212,.2)] text-sm md:text-base px-4 py-2 w-fit h-[30px]'
                                        onClick={() => {
                                            setIsDrawerOpen(false)
                                            navigate('/sign-in')
                                        }}
                                    >
                                        Sign in
                                    </Button>
                            }
                        </div>
                    }
                >
                    <NavMenuList
                        userInfo={userInfo}
                        onClick={() => setIsDrawerOpen(false)}
                    />
                </AntDrawer>
            </div>
        </nav>
    )
}

export default Header