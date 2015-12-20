import ErrorBase				= require("awayjs-core/lib/errors/ErrorBase");

class CastError extends ErrorBase
{
	constructor(message:string)
	{
		super(message);
	}
}

export = CastError;