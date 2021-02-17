import { LightningElement, api, wire } from 'lwc';
import {
    publish,
    MessageContext
} from 'lightning/messageService';
import FILTERSCHANGEMC from '@salesforce/messageChannel/FiltersChange__c';

export default class Gt001 extends LightningElement {
    @api t001;

    code="";
    kana="";
    broker1="";
    broker2=""

    changeCode(event){
        this.code = event.target.value;
    }

    searchByCode(event){
        
        this.enableSnipper(event);
        this.jump2Comp('code');
    }

    changeKana(event){
        this.kana = event.target.value;
    }

    searchByKana(event){
        this.enableSnipper(event);
        // alert(this.kana);
        this.jump2Comp('kana');
    }

    changeBroker1(event){
        this.broker1 = event.target.value;
    }

    changeBroker2(event){
        this.broker2 = event.target.value;
    }

    searchByBrokerCode(event){
        this.enableSnipper(event);
        alert(`${this.broker1}-${this.broker2}`);
    }

    enableSnipper(event){
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();
        // Creates the event with the contact ID data.
        const t001Value = {
            code: this.code,
            kana: this.kana,
            broker1: this.broker1,
            broker2: this.broker2
        }
        const snipperEvent = new CustomEvent('snipperevent', { detail: {flag: true, t001: t001Value}});
        // Dispatches the event.
        this.dispatchEvent(snipperEvent);
    }

    @wire(MessageContext)
    messageContext;

    jump2Comp(type){
        const filters = {
            searchKey: this.code,
            searchType: type
        };
        publish(this.messageContext, FILTERSCHANGEMC, filters);
    }


}