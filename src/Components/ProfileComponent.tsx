import React, {useState} from 'react';
import { ProfileList } from './ProfileList';




export function ProfileComponent() {

    const [showList, setShowList] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>("Show employees");
    const handleKnappClick = () => {
        setShowList(!showList);
        if(!showList){
            setButtonText("Hide employees");
        }
        else {
            setButtonText("Show employees");
        }
    };

    return (
        <div>
            <h3>Hejsan</h3>
            <button onClick={handleKnappClick}>{buttonText}</button>
            {
            showList && <ProfileList/>
            }
        </div>
    );
}