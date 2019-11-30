class MicroList extends Array<Element> {
    constructor(items?: Array<Element>) {
        super(...items);
        (<any>Object).setPrototypeOf(this, Object.create(MicroList.prototype));
    }
    _map(fn: (el: Element, index?: number) => any): MicroList {
    	let results = new MicroList();
		for (let index = 0; index < this.length; index++) {
			results.push(fn(this[index], index));
		}
		return results;

    }
	add_class(class_name: string): MicroList {
		return this._map((el: Element): Element => { 
			el.classList.add(class_name); 
			return el; 
		});
	}
	remove_class(class_name: string): MicroList {
		return this._map((el: Element): Element => { 
			el.classList.remove(class_name); 
			return el; 
		});
	}
	toggle_class(class_name: string): MicroList {
		return this._map((el: Element): Element => { 
			el.classList.toggle(class_name); 
			return el; 
		});
	}
	has_class(class_name: string): boolean {
		for (let index = 0; index < this.length; index++) {
			if(this[index].classList.contains(class_name)) return true;
		}
		return false;
	}
}

function Find(selector: string): MicroList {
	const els: NodeList = document.querySelectorAll(selector);
	return new MicroList(Array.prototype.slice.call(els));
}
