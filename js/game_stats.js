function GameStats()
{
	this.gamestats = new Object();
	this.gamestatmorphers = new Object();
};

GameStats.prototype.setStatsData = function(data)
{
	delete this.gamestats;
	this.gamestats = data;
};

GameStats.prototype.setGameStat = function(stat, value)
{
	this.gamestats[stat] = value;
};

GameStats.prototype.setGameStatMorpher = function(stat, morpher)
{
	this.gamestatmorphers[stat] = morpher;
};

GameStats.prototype.setGameStatValueAndMorpher = function(stat, value, morpher)
{
	this.setGameStat(stat, value);
	this.setGameStatMorpher(stat, morpher);
};

GameStats.prototype.removeGameStat = function(stat)
{
	if (this.gamestats.hasOwnProperty(stat))
	{
		delete this.gamestats[stat];
	}
};

GameStats.prototype.removeGameStatMorpher = function(stat)
{
	if (this.gamestatmorphers.hasOwnProperty(stat))
	{
		delete this.gamestatmorphers[stat];
	}
};

GameStats.prototype.removeGameStatAndMorpher = function(stat)
{
	this.removeGameStat(stat);
	this.removeGameStatMorpher(stat);
};

GameStats.prototype.getRawStat = function(stat)
{
	if (this.gamestats.hasOwnProperty(stat))
	{
		return this.gamestats[stat];
	}
};

GameStats.prototype.getStat = function(stat)
{
	var val = this.getRawStat(stat);
	return this.getStatFromRaw(stat, val);
};

GameStats.prototype.getStatFromRaw = function(stat, val)
{
	if (this.gamestatmorphers.hasOwnProperty(stat))
	{
		return this.gamestatmorphers[stat](val);
	}
	else
	{
		return val;
	}
};

GameStats.prototype.applyStatToHTMLElement = function(stat, element)
{
	var j = 0;
	if (this.gamestats.hasOwnProperty(stat))
	{
		var elems = element.querySelectorAll("#" + stat + ".stat");
		var val = this.gamestats[stat];
		for (i = 0; i < elems.length; i++)
		{
			elems[i].textContent = this.getStatFromRaw(stat, val);
			j++;
		}
		elems = element.querySelectorAll("#" + stat + ".rawstat");
		for (i = 0; i < elems.length; i++)
		{
			elems[i].textContent = val;
			j++;
		}
	}
	return j;
};

GameStats.prototype.setGameStatWithHTMLUpdate = function(stat, value, element)
{
	this.setGameStat(stat, value);
	this.applyStatToHTMLElement(stat, element);
};

GameStats.prototype.setGameStatAndMorpherWithHTMLUpdate = function(stat, value, morpher, element)
{
	this.setGameStatValueAndMorpher(stat, value, morpher);
	this.applyStatToHTMLElement(stat, element);
};

GameStats.prototype.applyStatsToHTMLElement = function(element)
{
	var j = 0;
	for (var stat in this.gamestats)
	{
		j += this.applyStatToHTMLElement(stat, element);
	}
	return j;
};