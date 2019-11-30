class MicroList extends Array<Element> {
    constructor(items?: Array<Element>) {
        super(...items);
        (<any>Object).setPrototypeOf(this, Object.create(MicroList.prototype));
    }
	check(): MicroList {
		console.log('hello')
		return this;
	}
}

function Find(selector: string): MicroList {
	const els: NodeList = document.querySelectorAll(selector);
	return new MicroList(Array.prototype.slice.call(els));
}
