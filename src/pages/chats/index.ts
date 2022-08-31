import { render } from "../../utils/render";
import ListChats from "./components/list-chats/ListChats";
import mock from './mock.js';

window.addEventListener("DOMContentLoaded", () => {
  const chats = new ListChats({ fields: mock });

  render('.main', chats);
});
