import { ButtonList } from "./buttons/ButtonList";
import { VideoContainer } from "./videos/VideoContainer";

export function MainContainer() {
  return (
    // <div className="col-span-11">
    <div className="overflow-y-auto h-screen ">
      <ButtonList />
      <VideoContainer />
    </div>
  );
}
