import ServerList from "../components/ServerList";
import UserCard from "../components/UserCard";

export default function Me() {
  const dms = [
    {
      id: 1,
      name: "Zarah",
    },
    {
      id: 2,
      name: "battOut",
    },
    {
      id: 3,
      name: "paint sniffer",
    },
    {
      id: 4,
      name: "Fluttershy",
    },
  ];

  return (
    <div className="me-page">
      <ServerList />
      <div className="side-bar">
        <ul className="dm-list">
          <div className="dm-header">
            <h3>DIRECT MESSAGES</h3>
            <box-icon name="plus" size="15px" color="white" />
          </div>
          {dms.map((dm) => {
            return (
              <li id={dm.id} key={dm.id} className="dm-list-item">
                <div className="user-info-container">
                  <div className="pfp-placeholder"></div>
                  <p>{dm.name}</p>
                </div>
                <box-icon name="x" size="15px" color="white" />
              </li>
            );
          })}
        </ul>

        <UserCard />
      </div>
      <div className="chat-background" style={{ width: "100%" }}></div>
    </div>
  );
}
