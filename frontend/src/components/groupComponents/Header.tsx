import { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";
import NavMenuList from "./NavMenuList";
import { Drawer as AntDrawer } from "antd";
import ProfileLogo from "../baseComponents/ProfileLogo";
import Button from "../baseComponents/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, signoutUser } from "../../store";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <nav className="flex justify-center items-center sticky top-0 z-[100] h-[80px] shadow-md bg-white">
            <div className="header-content flex justify-between items-center w-[100%] md:w-[90%] lg:w-[80%] p-4 md:p-0">
                <h1 className='text-[0.8rem] sm:text-[1rem] lg:text-[1.5rem] uppercase tracking-[3px] font-[800] text-[#00bcd4]'>Plan & Learn</h1>
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
                        <h1 className='text-[1rem] uppercase tracking-[3px] font-[800] my-3'>Plan & Learn</h1>
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
                            <div className="flex items-center">
                                <ProfileLogo
                                    imageURL={userInfo?.picture || ''}
                                    name={userInfo?.name || 'Guest User'}
                                />
                                <div className="ms-2">
                                    <p className='font-semibold text-[#333] text-[1rem] tracking-[1px]'>{'Guest User'}</p>
                                </div>
                            </div>
                            {
                                userInfo?.name ?
                                    <Button
                                        className='btn bg-[#00bcd4] text-[#fff] text-[0.8rem] uppercase font-semibold px-3 py-1 w-fit hover:bg-[#fff] hover:text-[#00bcd4] hover:border-[#00bcd4]'
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
                                        className='btn bg-[#00bcd4] text-[#fff] hover:bg-[rgba(0,188,212,0.8)] text-[0.8rem] uppercase font-semibold px-3 py-1 w-fit'
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