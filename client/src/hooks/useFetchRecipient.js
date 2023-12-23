import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";

export default function useFetchRecipient({ chat, user }) {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!chat || !user) {
            return console.log("chat or user may be null"); 
        }
        const recipientId = chat.members.find((id) => id !== user?.user[0]?._id);

        const getUser = async () => {
            try {
                if (!recipientId) return;
                
                const response = await getRequest(`${baseUrl}/find/${recipientId}`);
                if (response.error) {
                    setError(response);
                } else {
                    setRecipientUser(response);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUser();
    }, [chat, user]);

    return { recipientUser, error };
}
