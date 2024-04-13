import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChanneInfo from "./ChannelInfo";
import { Chat } from "./Chat";
import { AspectRatio } from "./components/ui/aspect-ratio";
import VideoFeed from "./VideoFeed";

export default function Stream() {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={50}
          maxSize={80}
          defaultSize={80}
          className="w-full"
          order={1}
        >
          <AspectRatio ratio={16 / 9}>
            <VideoFeed />
          </AspectRatio>
          <div className="overflow-y-auto h-full">
            <ChanneInfo />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          collapsedSize={0}
          collapsible
          minSize={20}
          maxSize={40}
          defaultSize={30}
          className="w-full h-full"
          order={2}
        >
          <Chat />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
