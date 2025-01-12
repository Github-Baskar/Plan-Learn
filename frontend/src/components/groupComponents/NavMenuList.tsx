import { NavLink } from "react-router-dom";
import { Popover as AntPopover } from "antd";
import { menuList } from "../../utilities/constants";
import Button from "../baseComponents/Button";
import ProfileLogo from "../baseComponents/ProfileLogo";

type NavMenuListProps = {
    onClick?: () => void
}

const NavMenuList = ({
    onClick,
}: NavMenuListProps) => {
    return (
        <ul className={`flex flex-col md:flex-row items-start justify-between md:items-center`}>
            {
                Array.isArray(menuList) &&
                    menuList.length > 0 ? menuList.map((menu, index) => {
                        return (
                            <li
                                key={index}
                                className='max-md:w-full font-semibold'
                                onClick={onClick}
                            >
                                <NavLink
                                    to={`/${menu.path === "home" ? "" : menu.path}`}
                                    className={`nav-link flex items-center md:justify-end md:text-[0.9rem] lg:text-[1rem] py-3 md:px-4 md:py-0`}
                                >
                                    {menu.name}
                                </NavLink>
                            </li>
                        )
                    }) : ''
            }
            <li className='hidden md:block ms-4'>
                <AntPopover
                    content={
                        <div className='flex flex-col gap-2 min-w-[225px]'>
                            <p className='font-semibold text-[#4b5563] text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] tracking-[1px] ms-[0.4px]'>Name: <span>{'Guest User'}</span></p>
                            <p className='font-semibold text-[#4b5563] text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] tracking-[1px] ms-[0.4px]'>Mail Id: <span>{'--'}</span></p>
                            <div className="text-end">
                                {/* <Button
                                    className=''
                                >
                                    Sign out
                                </Button> */}
                                <Button
                                    className='btn bg-[#fe612d] text-[#fff] hover:bg-[rgba(254,97,45,0.8)] text-[0.8rem] uppercase font-semibold px-3 py-1 w-fit'
                                >
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    }
                    placement="bottomRight"
                >
                    <>
                        <ProfileLogo
                            imageURL={''}
                            name={'Guest User'}
                        />
                    </>
                </AntPopover>
            </li>
        </ul>
    )
}

export default NavMenuList