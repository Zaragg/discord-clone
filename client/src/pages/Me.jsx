import ServerList from "../components/ServerList";

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

        <div className="user-list-item">
          <div className="user-list-item-pfp-name">
            <div className="pfp-placeholder">
              <div className="pfp-status pfp-status-busy">
                <box-icon
                  name="minus"
                  flip="horizontal"
                  color="#1E1F22"
                  size="15px"
                ></box-icon>
              </div>
            </div>
            <div>
              <p>pomegranat...</p>
              <p>Do Not Distu...</p>
            </div>
          </div>
          <div>
            <box-icon
              name="microphone-off"
              type="solid"
              flip="horizontal"
              color="#EC3E41"
              size="20px"
            ></box-icon>
            <box-icon
              name="headphone"
              flip="horizontal"
              size="20px"
              color="#B5BAC1"
            ></box-icon>
            <box-icon
              name="cog"
              type="solid"
              flip="horizontal"
              size="20px"
              color="#B5BAC1"
            ></box-icon>
          </div>
        </div>
      </div>
      <div className="chat-background" style={{ width: "100%" }}></div>
    </div>
  );
}
