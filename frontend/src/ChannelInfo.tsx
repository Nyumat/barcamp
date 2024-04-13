import { PersonIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const game = "Just Chatting";
const channel = "Nyumat";
const title = "Nyumat is writing Spaghetti Code";
const viewers = 1234;

const gameImage = `https://static-cdn.jtvnw.net/ttv-boxart/${game}-144x192.jpg`;

export default function ChanneInfo() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between p-2 mx-12 h-fit">
        <div className="flex items-center">
          <img src={gameImage} alt={game} className="w-16 h-20 rounded-md" />
          <div className="ml-2">
            <h1 className="text-lg font-semibold">{channel}</h1>
            <p className="text-sm text-gray-400">{title}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <PersonIcon className="text-gray-400 mx-2" />
            <span className="text-gray-400">{viewers} viewers</span>
          </div>
          <div className="flex items-center">
            <PlusIcon size={24} className="text-gray-400 mx-2" />
            <span className="text-gray-400">Follow</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 mx-12 h-full my-4">
        <h1 className="text-lg font-semibold">Other Related Streamers</h1>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col items-center">
            <img
              onClick={() => navigate("/stream/Theo.gg")}
              src="https://clips-media-assets2.twitch.tv/dAGCiUKCuIPT72pT3GI3jg/43223888843-offset-8452-preview-480x272.jpg"
              alt="Theo.gg"
              className="w-full h-32 rounded-md cursor-pointer"
            />
            <p className="text-sm">Theo.gg</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              onClick={() => navigate("/stream/ThePrimeagen")}
              src="https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/cb91bd3aa328a1602105_theprimeagen_43986977259_1712577377//thumb/thumb0-640x360.jpg"
              alt="ThePrimeagen"
              className="w-full h-32 rounded-md cursor-pointer"
            />
            <p className="text-sm">ThePrimeagen</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              onClick={() => navigate("/stream/BashBunni")}
              src="https://clips-media-assets2.twitch.tv/nlbQIr4d947pssTpmJq4Cw/AT-cm%7CnlbQIr4d947pssTpmJq4Cw-preview-480x272.jpg"
              alt="BashBunni"
              className="w-full h-32 rounded-md cursor-pointer"
            />
            <p className="text-sm">BashBunni</p>
          </div>
        </div>
      </div>
    </>
  );
}
