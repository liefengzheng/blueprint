import { LightningElement, api } from 'lwc';

export default class Gt005 extends LightningElement {
    @api top;
    @api classname;

    handlerSnipperEvent(event){
        // alert(event.detail.flag);
        event.preventDefault();
        
        // Creates the event with the contact ID data.
        const snipperEvent = new CustomEvent('csnipperevent', { detail: event.detail });
        // Dispatches the event.
        this.dispatchEvent(snipperEvent);
    }

}