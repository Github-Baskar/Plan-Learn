import { NavLink, useNavigate } from "react-router-dom";
import { Popover as AntPopover } from "antd";

import { menuList } from "../../utilities/constants";

import Button from "../baseComponents/Button";
import ProfileLogo from "../baseComponents/ProfileLogo";

type NavMenuListProps = {
    isLoading?: boolean;
    userInfo: {
        id: string;
        name: string;
        email: string;
        picture?: string;
    } | null;
    onClick?: () => void;
    signout?: () => void;
}

const NavMenuList = ({
    isLoading = false,
    userInfo,
    onClick,
    signout,
}: NavMenuListProps) => {
    const navigate = useNavigate();
    return (
        <ul className={`flex flex-col md:flex-row items-start justify-between md:items-center`}>
            {
                Array.isArray(menuList) &&
                    menuList.length > 0 ? menuList.map((menu, index) => {
                        if (menu.authRoute && !userInfo) {
                            return null
                        }
                        return (
                            <li
                                key={index}
                                className='max-md:w-full font-semibold'
                                onClick={onClick}
                            >
                                <NavLink
                                    to={menu.path}
                                    className={`nav-link flex items-center md:justify-end md:text-[0.9rem] lg:text-[1rem] hover:text-[#00bcd4] py-3 md:px-4 md:py-0`}
                                >
                                    {menu.name}
                                </NavLink>
                            </li>
                        )
                    }) : ''
            }
            <li className='hidden md:block ms-4'>
                <AntPopover
                    trigger="click"
                    content={
                        <div className='flex flex-col gap-2 min-w-[225px]'>
                            <p className='font-semibold text-[#4b5563] text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] tracking-[1px] ms-[0.4px]'>Name: <span>{userInfo?.name || 'Guest User'}</span></p>
                            <p className='font-semibold text-[#4b5563] text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] tracking-[1px] ms-[0.4px]'>Mail Id: <span>{userInfo?.email || '--'}</span></p>
                            <div className="text-end">
                                {
                                    userInfo?.name ?
                                        <Button
                                            className='btn !border-[#00bcd4] !text-[rgb(0,188,212)] bg-[rgba(0,188,212,.1)] hover:!bg-[rgba(0,188,212,.2)] text-sm md:text-base px-4 py-2 w-fit h-[30px]'
                                            loading={isLoading}
                                            onClick={signout}
                                        >
                                            Sign out
                                        </Button> :
                                        <Button
                                            className='btn !border-[#00bcd4] !text-[rgb(0,188,212)] bg-[rgba(0,188,212,.1)] hover:!bg-[rgba(0,188,212,.2)] text-sm md:text-base px-4 py-2 w-fit h-[30px]'
                                            onClick={()=>navigate('/sign-in')}
                                        >
                                            Sign in
                                        </Button>
                                }
                            </div>
                        </div>
                    }
                    placement="bottomRight"
                >
                    <>
                        <ProfileLogo
                            imageURL={userInfo?.picture || ''}
                            name={userInfo?.name || 'Guest User'}
                        />
                    </>
                </AntPopover>
            </li>
        </ul>
    )
}

export default NavMenuList