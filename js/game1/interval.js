function Interval(type,interval, initial)
{
	this.type = type;
	this.interval = interval;
	this.next_time = initial;
	this.decrement = 0;
	this.counter = 0;
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
		var asd = toAdd - (this.counter++ * this.decrement);
		this.next_time = gameTime + Math.max(asd,500);
		if(this.decrement > 0)
		{	
			console.log(Math.max(asd,500));
		}
		return true;
	}
	else{return false;}
}

Interval.prototype.setDecrement = function(decrement)
{
	this.decrement = decrement;
}

Interval.prototype.reset = function()
{
	counter = 0;
}