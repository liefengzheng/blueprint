import { LightningElement, api } from 'lwc';

export default class Breadcrumbs extends LightningElement {
    @api breadcrumbs;
    @api nodecnt;

    handleNavigateTo(event){
        // alert(event.target.name);
        const listEvent = new CustomEvent('jump2event', { detail: {dest: event.target.name}});
        // Dispatches the event.
        this.dispatchEvent(listEvent);

    }

}