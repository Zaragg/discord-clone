import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authState } = useAuthContext();
  useEffect(() => {
    if (authState) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authState._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authState]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
