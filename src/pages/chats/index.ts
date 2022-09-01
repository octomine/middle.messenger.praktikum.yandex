import { render } from "../../utils/render";
import ListChats from "./components/list-chats/ListChats";
import mock from './mock.js';
import Chat from "./components/chat/Chat";

window.addEventListener("DOMContentLoaded", () => {
  const chats = new ListChats({
    fields: mock,
    events: {
      click: () => {
        console.log(chats.selected)
      }
    }
  });

  const chat = new Chat({});

  render('.main', chats);
  render('.main', chat);
});
