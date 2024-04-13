import { useNavigate } from "react-router-dom";

const streamers = [
  {
    name: "Theo.gg",
    image:
      "https://clips-media-assets2.twitch.tv/dAGCiUKCuIPT72pT3GI3jg/43223888843-offset-8452-preview-480x272.jpg",
  },
  {
    name: "ThePrimeagen",
    image:
      "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/cb91bd3aa328a1602105_theprimeagen_43986977259_1712577377//thumb/thumb0-640x360.jpg",
  },
  {
    name: "BashBunni",
    image:
      "https://clips-media-assets2.twitch.tv/nlbQIr4d947pssTpmJq4Cw/AT-cm%7CnlbQIr4d947pssTpmJq4Cw-preview-480x272.jpg",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between p-1 mx-12 h-fit">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Online Streamers</h1>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2 mx-12 h-full my-4">
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[...Array(10)].map((_, i) => {
            const streamer =
              streamers[Math.floor(Math.random() * streamers.length)];
            return (
              <div
                key={i}
                className="flex flex-col items-center"
                onClick={() => navigate(`/stream/${streamer.name}`)}
              >
                <img
                  src={streamer.image}
                  alt={streamer.name}
                  className="w-full h-42 rounded-md cursor-pointer"
                />
                <p className="text-sm">{streamer.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
