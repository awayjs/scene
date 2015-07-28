import MovieClip = require("awayjs-display/lib/entities/MovieClip");
import TextField = require("awayjs-display/lib/entities/TextField");

interface ITimelineSceneGraphFactory
{
    createMovieClip(): MovieClip;
    createTextField(): TextField;
}
export = ITimelineSceneGraphFactory;