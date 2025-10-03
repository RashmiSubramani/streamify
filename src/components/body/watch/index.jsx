import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./comments/CommentsContainer";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  });
  return (
    <div>
      <div>
        <iframe
          width="1560"
          height="615"
          src={`https://www.youtube.com/embed/${videoId}?si=YyWNsv61uBZD90Be`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="m-6 border border-red-2"
        />
      </div>
      <CommentsContainer />
    </div>
  );
}
