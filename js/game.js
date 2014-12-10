function Game(Morpher)
{
	this.size = 4;
	this.levelLength = 10;
	this.colors = ["red", "green", "yellow", "blue"];
	this.morpher = new Morpher;
	
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
	var poss = [];
	for (int i = 0; i < this.size; i++)
	{
		poss.push(i + 1);
	}
	var cols = this.colors.slice(0);
	for (i = 0; i < this.size; i++)
	{
		var pos = randomArrayElement(poss);
		var col = randomArrayElement(cols);
		removeFromArray(poss, pos);
		removeFromArray(cols, col);
		var element = this.morpher.addItem(col, pos, this.currentSide, []);
		element.addEventListener("mouseover", this.onMouseOverItemOption.bind(this, color, pos));
	}
};

Game.prototype.onRoomEnd = function(scorebonus, newpos, newside)
{
	this.room++;
	this.hasLeft = false;
	this.onRoomStart(
};

Game.prototype.onRoomStart = function(newpos, newside)
{
	var add = [];
	if (this.room == this.currentBad)
	{
		var element = this.morpher.addItem(this.randomColor(), newpos, newside, ["bad", "wait"]);
	}
	else
	{
		var element = this.morpher.addItem(this.randomColor(), newpos, newside, ["wait"]);
	}
	element.addEventListener("mouseover", this.onMouseOverMade.bind(this, element));
};

Game.prototype.onLevelEnd = function()
{
	this.level++;
	this.room = 0;
	this.currentBad = Math.floor(Math.random() * this.levelLength);
};

Game.prototype.onMouseOverItemOption = function(color, pos)
{

};

Game.prototype.onMouseNotOverMade = function(element)
{

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
	
	this.createRandomNormals();
};