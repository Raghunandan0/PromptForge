// import './App.css';
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
// import {MyContext} from "./MyContext.jsx";
// import { useState } from 'react';
// import {v1 as uuidv1} from "uuid";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(uuidv1());
//   const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);

//   const providerValues = {
//     prompt, setPrompt,
//     reply, setReply,
//     currThreadId, setCurrThreadId,
//     newChat, setNewChat,
//     prevChats, setPrevChats,
//     allThreads, setAllThreads
//   }; 

//   return (
//     <div className='app'>
//       <MyContext.Provider value={providerValues}>
//           <Sidebar></Sidebar>
//           <ChatWindow></ChatWindow>
//         </MyContext.Provider>
//     </div>
//   )
// }

// export default App



// import './App.css';
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
// import { MyContext } from "./MyContext.jsx";
// import { useState } from 'react';
// import { v1 as uuidv1 } from "uuid";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login.jsx";
// import Register from "./components/Register.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState(null);
//   const [currThreadId, setCurrThreadId] = useState(uuidv1());
//   const [prevChats, setPrevChats] = useState([]);
//   const [newChat, setNewChat] = useState(true);
//   const [allThreads, setAllThreads] = useState([]);

//   const providerValues = {
//     prompt, setPrompt,
//     reply, setReply,
//     currThreadId, setCurrThreadId,
//     newChat, setNewChat,
//     prevChats, setPrevChats,
//     allThreads, setAllThreads
//   };

//   return (
//     <AuthProvider>
//       <MyContext.Provider value={providerValues}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <div className='app'>
//                   <Sidebar />
//                   <ChatWindow />
//                 </div>
//               </ProtectedRoute>
//             } />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </BrowserRouter>
//       </MyContext.Provider>
//     </AuthProvider>
//   );
// }

// export default App;










// App.jsx
/*
import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  };

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App; */







import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState, useEffect } from 'react';
import { v1 as uuidv1 } from "uuid";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Removed BrowserRouter

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  };

  // const isAuthenticated = !!localStorage.getItem("token");

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

useEffect(() => {
  const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
  window.addEventListener("storage", checkAuth); // triggers on logout/login

  return () => window.removeEventListener("storage", checkAuth);
}, []);


  return (
    <MyContext.Provider value={providerValues}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Chat App - Protected Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div className="app">
                <Sidebar />
                <ChatWindow />
              </div>
            ) : (
              <Navigate to="/login"  replace/>
            )
          }
        />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
