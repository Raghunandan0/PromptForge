// import express from "express";
// import Thread from "../models/Thread.js";
// import getOpenAIAPIResponse from "../utils/openai.js";

// const router = express.Router();

// //test
// router.post("/test", async(req, res) => {
//     try{
//         const thread = new Thread({
//             threadId: "xyz",
//             title: "Testing New Thread"
//         });
//         const response = await thread.save();
//         res.send(response);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to save in DB"});
//     }
// });

// //Get all threads
// router.get("/thread", async(req, res) => {
//     try{
//         const threads = await Thread.find({}).sort({updatedAt: -1});
//         //descending order of updatedAt...most recent data on top
//         res.json(threads);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error:"Failed to fetcg threads"});
//     }
// });

// router.get("/thread/:threadId", async(req, res) => {
//     const {threadId} = req.params;
//     try{
//         const thread = await Thread.findOne({threadId});

//         if(!thread){
//             res.status(404).json({error: "Thread not found"});

//         }
//         res.json(thread.messages);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to fetch chart"});
//     }
// });

// router.delete("/thread/:threadId", async(req, res) => {
//     const {threadId} = req.params;

//     try{
//          const deleteThread = await Thread.findOneAndDelete({threadId});

//          if(!deleteThread){
//             res.status(404).json({error: "Thread not found"});
//          }

//          res.status(200).json({success : "thread deleted successfully"});

//     } catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to delete thread"});
//     }
// });

// router.post("/chat", async(req, res) => {
//     const {threadId, message} = req.body;

//     if(!threadId || !message){
//         return res.status(400).json({error: "missing required fields"});
//     }

//     try{
//         let thread = await Thread.findOne({threadId});

//         if(!thread){
//             //create a new thread in Db
//             thread = new Thread({
//                 threadId,
//                 title: message,
//                 messages: [{role: "user", content: message}]
//             });
            
//         } else {
//             thread.messages.push({role: "user", content: message});
//         }

//         const assistantReply = await getOpenAIAPIResponse(message);

//         thread.messages.push({role: "assistant", content: assistantReply});
//         thread.updatedAt = new Date();

//         await thread.save();
//         res.json({reply: assistantReply});

//     } catch(err){
//         console.log(err);
//         res.status(500).json({error: "something went wrong"});
//     }
// });

// export default router;



import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

// Test Route
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz",
      title: "Testing New Thread"
    });
    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});

// Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Get a specific thread's messages
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// Delete a thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deleteThread = await Thread.findOneAndDelete({ threadId });

    if (!deleteThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

// Chat with assistant
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }]
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

