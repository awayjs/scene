import ErrorBase				from "awayjs-core/lib/errors/ErrorBase";

class CastError extends ErrorBase
{
	constructor(message:string)
	{
		super(message);
	}
}

export default CastError;