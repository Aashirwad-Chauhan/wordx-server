import express from "express";
import {isAuthenticated} from "../middlewares/auth.js";
import { 
    newGroupChat, 
    getMyChats, 
    getMyGroups, 
    addMembers, 
    removeMember, 
    leaveGroup, 
    sendAttachments, 
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages
} from "../controllers/chat.js";
import {attachmentsMulter} from "../middlewares/multer.js";
import { 
    addMemberValidator, 
    chatIdValidator, 
    newGroupValidator, 
    removeMemberValidator, 
    renameValidator, 
    sendAttachmentsValidator, 
    validateHandler 
} from "../lib/validator.js";

const app = express.Router();
//localhost:3000/api/v1/chat
//Logged In Routes
app.use(isAuthenticated);
app.post("/new", newGroupValidator(), validateHandler, newGroupChat);
app.get("/mychat", getMyChats);
app.get("/mychat/mygroup", getMyGroups);

app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
app.put("/removemember", removeMemberValidator(), validateHandler, removeMember);
app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

app.post("/message", attachmentsMulter, sendAttachmentsValidator(), validateHandler, sendAttachments);
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

app
.route("/:id")
.get(chatIdValidator(), validateHandler, getChatDetails)
.put(renameValidator(), validateHandler, renameGroup)
.delete(chatIdValidator(), validateHandler, deleteChat);


export default app;