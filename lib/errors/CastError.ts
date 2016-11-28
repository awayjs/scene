import {ErrorBase} from "@awayjs/core";

export class CastError extends ErrorBase
{
	constructor(message:string)
	{
		super(message);
	}
}