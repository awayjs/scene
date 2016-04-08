import Timeline from "awayjs-display/lib/base/Timeline";
import MovieClip from "awayjs-display/lib/display/MovieClip";
import TextField from "awayjs-display/lib/display/TextField";

interface ITimelineSceneGraphFactory
{
    createMovieClip(timelime:Timeline): MovieClip;
    createTextField(): TextField;
}

export default ITimelineSceneGraphFactory;