import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {
    @api breadcrumbs;
    @api nodecnt;

    handleJump(event){
        // alert(event.detail.dest);
        const listEvent = new CustomEvent('jump2event', { detail: {dest: event.detail.dest}});
        // Dispatches the event.
        this.dispatchEvent(listEvent);
    }
}