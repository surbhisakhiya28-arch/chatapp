// src/assets/assets.js

// Images
import bg from './bg.svg';
import logo from './logo.png';
import menu_icon from './menu_icon.png';
import search_icon from './search_icon.png';
import avatar_icon from './avatar_icon.png';
import right_arrow_icon from './right_arrow_icon.svg';
import logo_icon from './logo_icon.svg';
import send_button from './send_button.svg';
import gallery_icon from './gallery_icon.svg';
import logo_big from './logo_big.svg';
import pic1 from './pic1.png';
import pic2 from './pic2.png';
import pic3 from './pic3.png';
import pic4 from './pic4.png';
import pic5 from './pic5.png';
import pic6 from './pic6.png';
import im1 from './im1.png';

// Export all assets
const assets = {
  bg,
  logo,
  menu_icon,
  search_icon,
  avatar_icon,
  right_arrow_icon,
  logo_icon,
  logo_big,
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  im1,
  send_button,
  gallery_icon
};

export default assets;

// Dummy images array
export const imageDummyData = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
];

// Dummy users
export const userDummyData = [
  {
    _id: "680f50aaf10f3cd28382ecf2",
    email: "test1@greatstack.dev",
    fullName: "Alison Martin",
    profilePic: pic1,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f50e4f10f3cd28382ecf9",
    email: "test2@greatstack.dev",
    fullName: "Martin Johnson",
    profilePic: pic2,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f510af10f3cd28382ed01",
    email: "test3@greatstack.dev",
    fullName: "Enrique Martinez",
    profilePic: pic3,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f5137f10f3cd28382ed10",
    email: "test4@greatstack.dev",
    fullName: "Marco Jones",
    profilePic: pic4,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f516cf10f3cd28382ed11",
    email: "test5@greatstack.dev",
    fullName: "Richard Smith",
    profilePic: pic5,
    bio: "Hi Everyone, I am Using QuickChat",
  }
];

// Dummy messages
export const messagesDummyData = [
  {
    _id: "680f571ff10f3cd28382f094",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:23:27.844Z",
  },
  {
    _id: "680f5726f10f3cd28382f0b1",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:23:34.520Z",
  },
  {
    _id: "680f5729f10f3cd28382f0b6",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:23:37.301Z",
  },
  {
    _id: "680f572cf10f3cd28382f0bb",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:23:40.334Z",
  },
  {
    _id: "680f573cf10f3cd28382f0c0",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    image: im1,
    seen: true,
    createdAt: "2025-04-28T10:23:56.265Z",
  },
  {
    _id: "680f5745f10f3cd28382f0c5",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    image: im1,
    seen: true,
    createdAt: "2025-04-28T10:24:05.164Z",
  },
  {
    _id: "680f5748f10f3cd28382f0ca",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:24:08.523Z",
  }
];