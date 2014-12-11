function Game(Morpher, dobads)
{
	this.hasBad = dobads;
	this.colors = ["red", "green", "yellow", "blue"];

	this.size = 4;
	this.levelLength = 10;
	this.morph = new Morpher;
	
	this.setup();
	this.lastTick = Date.now();
	window.requestAnimationFrame(this.tick.bind(this));
}

removeFromArray = function(array, element)
{
	var index = array.indexOf(element);
	if (index > -1) 
	{
		array.splice(index, 1);
	}
};

randomArrayElement = function(array)
{
	return array[Math.floor(Math.random() * array.length)];
};

Game.prototype.tick = function()
{
	var time = Date.now();
	var dt = time - this.lastTick;
	this.lastTick = time;
	if (!this.isPaused)
	{
		if (this.hasLeft)
		{
			this.score -= this.droprate * (dt / 1000.0);
		}
	}
	window.requestAnimationFrame(this.tick.bind(this));
}

Game.prototype.createRandomNormals = function()
{
	var cols = this.colors.slice(0);
	for (i = 0; i < this.size; i++)
	{
		var col = randomArrayElement(cols);
		removeFromArray(cols, col);
		var element = this.morph.addItem(col, i + 1, this.currentSide, [], "item");
		element.querySelector(".item-in").onmouseover = this.onMouseOverItemOption.bind(this, col, i + 1);
	}
};

Game.prototype.onRoomEnd = function(scorebonus, newpos, newside)
{
	this.score += scorebonus;
	this.morph.reset();
	this.room++;
	if (this.room == this.levelLength)
	{
		this.onLevelEnd();
	}
	this.onRoomStart(newpos, newside);
};

Game.prototype.onRoomStart = function(newpos, newside)
{
	this.currentSide = newside;
	this.createRandomNormals();
	this.hasLeft = false;
	var add = [];
	this.currentColor = this.randomColor();
	if (this.room == this.currentBad && this.hasBad)
	{
		var element = this.morph.addItem(this.currentColor, newpos, 1 - newside, ["bad"], "item-made");
	}
	else
	{
		var element = this.morph.addItem(this.currentColor, newpos, 1 - newside, [], "item-made");
	}
	element.querySelector(".item-in").onmouseover = this.onMouseOverMade.bind(this, element);
	element.onmouseout = this.onMouseOutMade.bind(this, element, newpos);
	this.morph.addClass(element, "wait");
};

Game.prototype.onLevelEnd = function()
{
	this.level++;
	this.room = 0;
	this.droprate += 15;
	this.droprate *= 1.08;
	this.currentBad = Math.floor(Math.random() * this.levelLength);
};

Game.prototype.onMouseOverItemOption = function(color, pos)
{
	if (this.hasLeft)
	{
		var bonus = 0;
		if (this.room == this.currentBad && this.hasBad)
		{
			bonus = -1000;
		}
		else if (color === this.currentColor)
		{
			bonus = 200;
		}
		else
		{
			bonus = -100;
		}
		this.onRoomEnd(bonus, pos, 1 - this.currentSide);
	}
};

Game.prototype.onMouseOutMade = function(element)
{
	if (this.morph.changeClass(element, "wait", "go"))
	{
		this.hasLeft = true;
	}
};

Game.prototype.onMouseOverMade = function(element, pos)
{
	if (this.hasLeft)
	{
		if (this.room == this.currentBad && this.hasBad)
		{
			this.onRoomEnd(2000, pos, this.currentSide);
		}
	}
};

Game.prototype.randomColor = function()
{
	return randomArrayElement(this.colors);
};

Game.prototype.getLevelRoom = function()
{
	return this.level * this.levelLength + this.room;
};

Game.prototype.closeAllMessages = function()
{
	this.morph.hideAllMessages();
	this.isPaused = false;
};

Game.prototype.closeMessage = function(message)
{
	this.morph.hideMessage(message);
	this.isPaused = false;
};

Game.prototype.openMessage = function(message)
{
	this.morph.showMessage(message);
	this.isPaused = true;
};

Game.prototype.gameStart = function()
{
	this.morph.reset();
	this.isPaused = true;
	this.currentSide = 0;
	this.currentColor = this.randomColor();
	this.currentBad = Math.floor(Math.random() * (this.levelLength - 1)) + 1;
	this.level = 0;
	this.room = 0;
	this.hasLeft = false;
	this.score = 500;
	this.droprate = 30;
	
	var element = this.morph.addItemInitial(this.currentColor, ["wait-full"]);
	element.querySelector(".item-in").onmouseover = (function() {this.morph.changeClass(element, "wait-full", "wait")}).bind(this);
	element.onmouseout = this.onMouseOutMade.bind(this, element);
	this.createRandomNormals();
	this.closeAllMessages();
};

Game.prototype.setup = function()
{
	this.gameStart();
};