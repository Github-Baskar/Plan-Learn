import { useState } from 'react';
import { profileName } from '../../utilities/commonFunction';

type ProfileLogoProps = {
    imageURL?: string;
    name: string;
}

const ProfileLogo = ({
    imageURL = '',
    name = "Guest User",
}: ProfileLogoProps) => {
    const [imgError, setImgError] = useState(false);
    return (
        <>
            {
                imageURL && !imgError ?
                    <img
                        className="cursor-pointer rounded-full object-center w-[38px] h-[38px] md:w-[40px] md:h-[40px]"
                        src={imageURL}
                        alt="user"
                        onError={() => setImgError(true)}
                    /> :
                    <div className="profile-picture-name flex justify-center items-center rounded-full cursor-pointer w-[40px] h-[40px] font-semibold text-[18px] bg-[#00bcd4] text-[#fff]">{profileName(name)}</div>
            }
        </>
    );
};

export default ProfileLogo;