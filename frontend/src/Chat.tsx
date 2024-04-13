/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { cn } from "./lib/utils";
import socket from "./socket/main";

type User = {
  name: string;
  color: string;
};

interface Message {
  body: string;
  type: string;
  user: User;
}

export function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({ name: "", color: "" });
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currrentUserName, setCurrentUserName] = useState("");
  const [currentUserColor, setCurrentUserColor] = useState("");

  useEffect(() => {
    socket.onAny((event, message) => {
      if (event === "message") {
        // prevent duplicate messages
        let duplicate = false;
        duplicate = messages.some((message) => message.body === message.body);
        if (!duplicate) {
          setMessages((messages) => [...messages, message]);
        } else {
          console.log("duplicate message");
        }
      } else return console.log(event, message);
    });
    return () => {
      socket.offAny((event, ...args) => {
        console.log(event, args);
      });
    };
  }, []);

  //   useEffect(() => {
  //     if (bottomRef.current)
  //       bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);

  // everytime the chat changes, re-mount the modal
  // set to true to show the modal
  useEffect(() => {
    setIsModalOpen(true);
  }, [location.pathname]);

  useEffect(() => {
    socket.on("message-r", (message) => {
      if (message) {
        // prevent duplicate messages
        let duplicate = false;
        duplicate = messages.some((message) => message.body === message.body);
        if (!duplicate) {
          setMessages((messages) => [...messages, message]);
        } else {
          console.log("duplicate message");
        }
        setMessages((messages) => [...messages, message]);
      }
    });
  }, []);

  const sendMessage = (message: string) => {
    if (!currentUser) return;
    socket.emit("message", {
      body: message,
      type: "message",
      user: currentUser,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createUser = (name: string, color: string) => {
    setUsers((users: User[]) => [...users, { name, color }]);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col h-screen">
        {isModalOpen && (
          <>
            <div className="absolute top-0 right-0 bg-black/80 w-screen h-screen" />
            <AlertDialog open={isModalOpen} onOpenChange={closeModal}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Enter your username and color
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will be your username and color for the chat
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  type="text"
                  placeholder="Username"
                  onChange={(event) => {
                    setCurrentUserName(event.target.value);
                  }}
                />
                <Input
                  type="color"
                  onChange={(event) => {
                    setCurrentUserColor(event.target.value);
                  }}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => navigate("/")}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      createUser(currrentUserName, currentUserColor);
                      setCurrentUser({
                        name: currrentUserName,
                        color: currentUserColor,
                      });
                      closeModal();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        {!isModalOpen && (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-2 p-4">
                {messages.map((message, i) => (
                  <div key={i} className="flex flex-row gap-2">
                    <p
                      className={cn("text-sm font-bold")}
                      style={{ color: message.user.color }}
                    >
                      {message.user.name}
                    </p>
                    <div
                      key={i}
                      className={`flex gap-2 items-center ${
                        message.user.name === currentUser.name
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <p className="text-sm">{message.body}</p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef}></div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row gap-2 p-4">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                onClick={() => sendMessage(message)}
                variant={"secondary"}
              >
                Send
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
