import React from "react";
import io from "socket.io-client";
import { updateStateUser } from "../reducers/UserReducer";
import { connect } from "react-redux";
import { sendNotification } from "../reducers/NotificationsReducer";
import { SESSION_SERVICE_URL } from "@env";

const SocketIo = (props) => {
  const URL = SESSION_SERVICE_URL;
  const socket = io(URL, { autoConnect: false });
  socket.auth = { email: "webdevteam@rvdprojects.com", password: "plainText" };

	const listeners = [
    "connect",
    "session",
    "userConnected",
    "onUserDisconnected",
    "users",
    "privateMessage",
    "disconnect",
  ];

  socket.on("connect", onConnect);
  socket.on("session", onSession);
  socket.on("userConnected", onUserConnected);
  socket.on("userDisconnected", onUserDisconnected);
  socket.on("users", onUsers);
  socket.on("privateMessage", onPrivateMessage);
  socket.on("disconnect", onDisconnect);

  socket.onAny((event, ...args) => {
    if (!listeners.includes(event)) {
      console.error("!!!!!!!!!!!!!!!!!! onAny: !!!!!!!!!!!!!!!!!!");
      console.error(event, "\n", args, "\r --------------------------------");
    }
  });

  socket.connect();

  function onConnect(event, ...args) {
    console.warn("Socket-Connection:", URL);
    console.info(event, "\n", args, "\r --------------------------------");
  }

  function onSession(event, ...args) {
    console.info("onSession:");
		console.info(event, "\n", args, "\r --------------------------------");
    props.updateStateUser(event);
  }

  function onUserConnected(event, ...args) {
    console.info("onUserConnected:");
    console.info(event, "\n", args, "\r --------------------------------");
  }

  function onUserDisconnected(event, ...args) {
    console.info("onUserDisconnected:");
    console.info(event, "\n", args, "\r --------------------------------");
  }

  function onUsers(users, ...args) {
    console.info("onUsers:");

		let self = null;
    users.forEach((user) => {
      if(user.self = user.userID === socket.id) {
				self = user;
			}
    });
    // put the current user first, and then sort by username
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
		
    console.info(users, "\n", args, "\r --------------------------------");
		self && props.updateStateUser(self);
  }

  function onPrivateMessage(event, ...args) {
    console.info("onPrivateMessage:");
    console.info(event, "\n", args, "\r --------------------------------");
  }

  function onDisconnect(event, ...args) {
    console.info("onDisconnect:");
    console.error(event, "\n", args, "\r --------------------------------");
  }

  return;
};

const mapDispatchToProps = {
  sendNotification,
  updateStateUser,
};

export default connect(null, mapDispatchToProps)(SocketIo);
