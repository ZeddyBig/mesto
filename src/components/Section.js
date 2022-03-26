export class Section {
    constructor ({items, renderer}, constainerSelector){
        this._items = items;
        this._renderer = renderer;
        this._constainerSelector = constainerSelector;
    }
    
    renderItems() {                    
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(item) {                        
        this._constainerSelector.prepend(item);
    }
}