class MicroList extends Array<HTMLElement> {

    constructor(items?: Array<HTMLElement>) {
        super(...items);
        (<any>Object).setPrototypeOf(this, Object.create(MicroList.prototype));
    }

    // Class

	add_class(class_name: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.classList.add(class_name); 
			return el; 
		});
	}
	remove_class(class_name: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.classList.remove(class_name); 
			return el; 
		});
	}
	toggle_class(class_name: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
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

	// Attributes

	get_attribute(attribute: string): string | boolean  {
		for (let index = 0; index < this.length; index++) {
			let attr: string = this[index].getAttribute(attribute);
			if(attr) return attr;
		}
		return false;
	}

	set_attribute(attribute: string, value: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.setAttribute(attribute, value); 
			return el; 
		});
	}

	// Styles

	get_style(attribute: any): string | boolean {
		for (let index = 0; index < this.length; index++) {
			let attr: string = this[index].style[attribute];
			if(attr) return attr;
		}
		return false;
	}

	set_style(attribute: any, value: string | number): MicroList {
		return this._map((el: HTMLElement): HTMLElement => {
			el.style[attribute] = (<string>value); 
			return el; 
		});
	}

	// Content

	set_html(html: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.innerHTML = html; 
			return el; 
		});
	}

	set_text(text: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.innerHTML = '';
			el.appendChild(document.createTextNode(text));
			return el; 
		});
	}

	append(html: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.innerHTML = html + el.innerHTML; 
			return el; 
		});
	}

	prepend(html: string): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.innerHTML = el.innerHTML + html; 
			return el; 
		});
	}

	// Form Value

	value(): any {
		const values = [];
		for (let index = 0; index < this.length; index++) {
			values.push((<HTMLInputElement>this[index]).value)
		}
		return values.length > 1 ? values : values[0];
	}

	// Events

	bind(event: string, fn: (e: Event) => any): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.addEventListener(event, fn);
			return el; 
		});
	}

	unbind(event: string, fn: (e: Event) => any): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.removeEventListener(event, fn);
			return el; 
		});
	}

	delegate(target: string, event: string, fn: (e: Event) => any): MicroList {
		return this._map((el: HTMLElement): HTMLElement => { 
			el.addEventListener(event, function(e: Event): void{
				if((<HTMLElement>e.target).matches(target)){
					fn(e);
				}
			});
			return el; 
		});
	}

	// Animation
	// @todo
	// This is only animating from 0=>1 at the moment

	animate(properties: object, duration: number, cb: (micro: MicroList) => any): MicroList {
		const _micro = this;
		const time = Date.now();
		const _func = function(){
			const elapsed_time = Date.now() - time;
			let animation_state = (1 / duration) * elapsed_time;
			if(animation_state > 1) animation_state = 1;
			for (let index = 0; index < Object.keys(properties).length; index++) {
				let key = Object.keys(properties)[index];
				let value = (<any>properties)[key] * animation_state;
				_micro.set_style(key, value)
			}
			if(elapsed_time <= duration){
				window.requestAnimationFrame(_func);
			} else {
				cb(_micro)
			}
		}
		window.requestAnimationFrame(_func);
		return this;
	}

    // Utility

    _map(fn: (el: HTMLElement, index?: number) => any): MicroList {
    	let results = new MicroList();
		for (let index = 0; index < this.length; index++) {
			results.push(fn(this[index], index));
		}
		return results;

    }

}

// Search

function Micro(selector: string): MicroList {
	const els: NodeList = document.querySelectorAll(selector);
	return new MicroList(Array.prototype.slice.call(els));
}
