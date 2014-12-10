function HTMLMorpher()
{
	this.itemContainer = document.querySelector(".items-container");
};

HTMLMorpher.prototype.reset = function() 
{
	this.clearContainer(this.itemContainer);
};

HTMLMorpher.prototype.clearContainer = function(container) 
{
	while (container.firstChild)
	{
		container.removeChild(container.firstChild);
	}
};

HTMLMorpher.prototype.getPositionClass = function(pos, side)
{
	return "at-" + ["t","b"][side] + "-" + pos;
};

HTMLMorpher.prototype.addItem = function(color, pos, side, add)
{
	return this.addItemMinimal([color, this.getPositionClass(pos, side)].concat(add));
};

HTMLMorpher.prototype.addItemInitial = function(color, add)
{
	return this.addItemMinimal([color, "initial-start"].concat(add));
};

HTMLMorpher.prototype.addItemMinimal = function(add)
{
	var wrapper = document.createElement("div");
	var inner = document.createElement("div");
	
	var wrapclass = ["item"];
	
	this.applyClasses(wrapper, wrapclass.concat(add));
	this.applyClasses(inner, ["item-in"]);
	
	wrapper.appendChild(inner);
	this.itemContainer.appendChild(wrapper);
	return wrapper;
};

HTMLMorpher.prototype.applyClasses = function(element, classes) 
{
	element.setAttribute("class", classes.join(" "));
};

HTMLMorpher.prototype.addClass = function(element, newclass) 
{
	var classes = element.getAttribute("class").split(" ");
	var index = classes.indexOf(newclass);
	if (index > -1) 
	{
		return false;
	}
	classes.push(newclass);
	element.setAttribute("class", classes.join(" "));
	return true;
};

HTMLMorpher.prototype.changeClass = function(element, oldclass, newclass) 
{
	var classes = element.getAttribute("class").split(" ");
	var index = classes.indexOf(oldclass);
	if (index > -1) 
	{
		classes.splice(index, 1);
		classes.push(newclass);
		element.setAttribute("class", classes.join(" "));
		return true;
	}
	return false;
};