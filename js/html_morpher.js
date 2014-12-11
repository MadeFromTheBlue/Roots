function HTMLMorpher()
{
	this.itemContainer = document.querySelector(".items-container");
	this.messageContainer = document.querySelector(".game-message");
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

HTMLMorpher.prototype.showMessage = function(message)
{
	var elements = this.messageContainer.getElementsByClassName(message);
	if (elements.length > 0)
	{
		this.addClass(elements[0], "show");
		this.addClass(this.messageContainer, "show");
	}
};

HTMLMorpher.prototype.hideAllMessages = function()
{
	this.removeClass(this.messageContainer, "show");
	var elements = this.messageContainer.getElementsByClassName("show");
	for (i = 0; i < elements.length; i++)
	{
		this.removeClass(elements[i], "show")
	}
};

HTMLMorpher.prototype.hideMessage = function(message)
{
	var elements = this.messageContainer.getElementsByClassName(message);
	this.removeClass(this.messageContainer, "show");
	if (elements.length > 0)
	{
		this.removeClass(elements[0], "show");
	}
};

HTMLMorpher.prototype.getPositionClass = function(pos, side)
{
	return "at-" + ["t","b"][side] + "-" + pos;
};

HTMLMorpher.prototype.addItem = function(color, pos, side, add, item)
{
	return this.addItemMinimal([color, this.getPositionClass(pos, side)].concat(add), item);
};

HTMLMorpher.prototype.addItemInitial = function(color, add)
{
	return this.addItemMinimal([color, "initial-start"].concat(add), "item-made");
};

HTMLMorpher.prototype.addItemMinimal = function(add, item)
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

HTMLMorpher.prototype.removeClass = function(element, oldclass) 
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