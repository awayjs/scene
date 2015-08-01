import Timeline = require("awayjs-display/lib/base/Timeline");
import MovieClip = require("awayjs-display/lib/entities/MovieClip");
import TextField = require("awayjs-display/lib/entities/TextField");

interface ITimelineSceneGraphFactory
{
    createMovieClip(timelime:Timeline): MovieClip;
    createTextField(): TextField;
}
export = ITimelineSceneGraphFactory;