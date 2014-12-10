function Game(Morpher)
{
	this.scoreCounter = document.querySelector(".score");
	this.colors = ["red", "green", "yellow", "blue"];

	this.size = 4;
	this.levelLength = 10;
	this.morph = new Morpher;
	
	this.setup();
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

Game.prototype.createRandomNormals = function()
{
	var cols = this.colors.slice(0);
	for (i = 0; i < this.size; i++)
	{
		var col = randomArrayElement(cols);
		removeFromArray(cols, col);
		var element = this.morph.addItem(col, i + 1, this.currentSide, []);
		element.querySelector(".item-in").onmouseover = this.onMouseOverItemOption.bind(this, col, i + 1);
	}
};

Game.prototype.onRoomEnd = function(scorebonus, newpos, newside)
{
	this.score += scorebonus;
	this.scoreCounter.textContent = "Score: " + this.score;
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
	if (this.room == this.currentBad)
	{
		var element = this.morph.addItem(this.currentColor, newpos, 1 - newside, ["bad"]);
	}
	else
	{
		var element = this.morph.addItem(this.currentColor, newpos, 1 - newside, []);
	}
	element.querySelector(".item-in").onmouseover = this.onMouseOverMade.bind(this, element);
	element.onmouseout = this.onMouseOutMade.bind(this, element);
	this.morph.addClass(element, "wait");
};

Game.prototype.onLevelEnd = function()
{
	this.level++;
	this.room = 0;
	this.currentBad = Math.floor(Math.random() * this.levelLength);
};

Game.prototype.onMouseOverItemOption = function(color, pos)
{
	var bonus = 0;
	if (this.room == this.currentBad)
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
};

Game.prototype.onMouseOutMade = function(element)
{
	this.morph.changeClass(element, "wait", "go");
	this.hasLeft = true;
};

Game.prototype.onMouseOverMade = function(element)
{

};

Game.prototype.randomColor = function()
{
	return randomArrayElement(this.colors);
};

Game.prototype.setup = function()
{
	this.currentSide = 0;
	this.currentColor = this.randomColor();
	this.currentBad = Math.floor(Math.random() * (this.levelLength - 1)) + 1;
	this.level = 0;
	this.room = 0;
	this.hasLeft = false;
	this.score = 500;
	
	this.createRandomNormals();
};