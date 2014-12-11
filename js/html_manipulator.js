function HTMLManipulator()
{
	this.container = document.querySelector(".container");
	this.itemContainer = document.querySelector(".items-container");
	this.messageContainer = document.querySelector(".game-message");
};

HTMLManipulator.prototype.reset = function() 
{
	this.clearContainer(this.itemContainer);
};

HTMLManipulator.prototype.clearContainer = function(container) 
{
	while (container.firstChild)
	{
		container.removeChild(container.firstChild);
	}
};

HTMLManipulator.prototype.applyStats = function(stats)
{
	return stats.applyStatsToHTMLElement(this.container);
};

HTMLManipulator.prototype.applyStat = function(stats, stat)
{
	return stats.applyStatToHTMLElement(stat, this.container);
};

HTMLManipulator.prototype.showMessage = function(message)
{
	var elements = this.messageContainer.getElementsByClassName(message);
	if (elements.length > 0)
	{
		this.addClass(elements[0], "show");
		this.addClass(this.messageContainer, "show");
	}
};

HTMLManipulator.prototype.hideAllMessages = function()
{
	this.removeClass(this.messageContainer, "show");
	var elements = this.messageContainer.getElementsByClassName("show");
	for (i = 0; i < elements.length; i++)
	{
		this.removeClass(elements[i], "show")
	}
};

HTMLManipulator.prototype.hideMessage = function(message)
{
	var elements = this.messageContainer.getElementsByClassName(message);
	this.removeClass(this.messageContainer, "show");
	if (elements.length > 0)
	{
		this.removeClass(elements[0], "show");
	}
};

HTMLManipulator.prototype.getPositionClass = function(pos, side)
{
	return "at-" + ["t","b"][side] + "-" + pos;
};

HTMLManipulator.prototype.addItem = function(color, pos, side, add, item)
{
	return this.addItemMinimal([color, this.getPositionClass(pos, side)].concat(add), item);
};

HTMLManipulator.prototype.addItemInitial = function(color, add)
{
	return this.addItemMinimal([color, "initial-start"].concat(add), "item-made");
};

HTMLManipulator.prototype.addItemMinimal = function(add, item)
{
	var wrapper = document.createElement("div");
	var inner = document.createElement("div");
	
	var wrapclass = [item];
	
	this.applyClasses(wrapper, wrapclass.concat(add));
	this.applyClasses(inner, ["item-in"]);
	
	wrapper.appendChild(inner);
	this.itemContainer.appendChild(wrapper);
	return wrapper;
};

HTMLManipulator.prototype.applyClasses = function(element, classes) 
{
	element.setAttribute("class", classes.join(" "));
};

HTMLManipulator.prototype.addClass = function(element, newclass) 
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

HTMLManipulator.prototype.removeClass = function(element, oldclass) 
{
	var classes = element.getAttribute("class").split(" ");
	var index = classes.indexOf(oldclass);
	if (index > -1) 
	{
		classes.splice(index, 1);
		element.setAttribute("class", classes.join(" "));
		return true;
	}
	return false;
};

HTMLManipulator.prototype.changeClass = function(element, oldclass, newclass) 
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