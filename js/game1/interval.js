function Interval(type,interval, initial)
{
	this.type = type;
	this.interval = interval;
	this.next_time = initial;
}

Interval.prototype.checkInterval = function(gameTime)
{
	var toAdd = this.interval;
	if(this.type == 'random')
	{
		toAdd = rand(this.interval)
	}
	if(gameTime >= this.next_time)
	{
		if(this.type == 'random')
		{
			toAdd = rand(this.interval)
		}
		this.next_time = gameTime + toAdd;
		return true;
	}
	else{return false;}
}