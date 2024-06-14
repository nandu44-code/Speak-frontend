import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
    const { roomID } = useParams();
    const elementRef = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appID = 526911518;
            const serverSecret = 'c11ff9b5ab39d03f6236b4f8a5e4184e';
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), 'nandu');

            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: elementRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
            });
        };

        myMeeting();

        return () => {
            
        };
    }, [roomID]);

    return (
        <div className='w-full h-screen'>
            <div ref={elementRef}></div>
        </div>
    );
}

export default Room;
