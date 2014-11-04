/**
 * BaseClass for CommandProperties. Should not be instantiated directly.
 */
class CommandPropsBase
{
    constructor()
    {
    }
    public deactivate(thisObj):void
    {
        // should be overwritten
    }
    public apply(thisObj, time:number, speed:number):void
    {
        // should be overwritten
    }

}

export = CommandPropsBase;
