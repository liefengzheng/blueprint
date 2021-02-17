import { LightningElement, api } from 'lwc';

export default class Footer extends LightningElement {
    @api nodecnt;

    get isFirstPage() {
        return this.nodecnt ? false: true;
    }

    gotoPrev(event){
        const gotPrevEvent = new CustomEvent('gotoprev');
        // Dispatches the event.
        this.dispatchEvent(gotPrevEvent);
    }
}