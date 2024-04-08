import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import UserListCard from "./UserListCard";
function UserList({ serverId }) {
  const { onlineUsers } = useSocketContext();
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    async function getServerUsers() {
      if (serverId) {
        const response = await fetch(
          `http://localhost:5000/api/serversusers/${serverId}`
        ).then((resp) => resp.json());
        setMemberList(response);
        console.log(memberList);
      }
    }
    getServerUsers();
  }, [onlineUsers]);

  return (
    <div className="user-list">
      <div className="online-text">
        <p>ONLINE - {onlineUsers.length}</p>
        {memberList
          .filter((member) => onlineUsers.includes(member._id))
          .map((filtered) => (
            <UserListCard member={filtered} isOffline={false} />
          ))}
      </div>

      <div className="online-text">
        <p>OFFLINE - {memberList.length - onlineUsers.length}</p>
        {memberList
          .filter((member) => !onlineUsers.includes(member._id))
          .map((filtered) => (
            <UserListCard member={filtered} isOffline={true} />
          ))}
      </div>
    </div>
  );
}

export default UserList;
