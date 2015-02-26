function Interval(interval, initial)
{
	this.interval = interval;
	this.next_time = initial;
}

Interval.prototype.checkInterval = function(gameTime)
{
	if(gameTime >= this.next_time)
	{
		this.next_time = gameTime + this.interval;
		return true;
	}
	else{return false;}
}