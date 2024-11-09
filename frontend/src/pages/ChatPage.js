import React, { useEffect, useState } from "react";
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([]); // Fixed typo in setChats

    const fetchChats = async () => {
        try {
            const { data } = await axios.get('/api/chats');
            setChats(data); // Fixed typo in setChats
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {chats.map(chat => (
                <div key={chat.id}>{chat.name}</div> // Replace chat.id and chat.message with your actual chat properties
            ))}
        </div>
    );
}

export default ChatPage;
