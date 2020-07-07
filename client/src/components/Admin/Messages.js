import React from "react";

const Messages = () => {
  return (
    <div className={"container admin__messages mt-5"}>
      <div className="row">
        <div className="col-3 pr-0">
          <div className={"admin__messages-inbox"}>
            <h1 className={"text-center"}>Inbox</h1>
          </div>
        </div>
        <div className="col-9 pl-0">
          <div className={"admin__messages-inner"}>
            <h1 className={"text-center"}>Chat</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
