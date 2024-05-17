import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
    const { roomID } = useParams();
    const elementRef = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appID = 940242502;
            const serverSecret = '5f9ef8978b21371e6b2548480ab0d63c';
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
            // Clean-up function to leave the room when the component unmounts
            // You may need to add the necessary leave room logic here
           
        };
    }, [roomID]);

    return (
        <div className='w-full h-screen'>
            <div ref={elementRef}></div>
        </div>
    );
}

export default Room;
