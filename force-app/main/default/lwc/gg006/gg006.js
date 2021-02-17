import { api, LightningElement, track, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import FILTERSCHANGEMC from '@salesforce/messageChannel/FiltersChange__c';
import getDetailInfo from '@salesforce/apex/GSS_CTL_GG001.getDetailInfo';

export default class Gg001 extends LightningElement {
    @api classname;

    @track detailInfo;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            FILTERSCHANGEMC,
            (message) => {
                this.handleFilterChange(message);
            },
            { scope: APPLICATION_SCOPE }
        );
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    async handleFilterChange(filters) {
        if (filters.searchType == 'code') {

            this.template.querySelector('lightning-tabset').activeTabValue = 'first';
            // const result1 = await getDetailInfo({ code: '111' });
            this.detailInfo = await this.asyncCallApexMethod(filters);

            // call apex method to search value
            const detailEvent = new CustomEvent('showdetailevent', { detail: {}});
            // Dispatches the event.
            this.dispatchEvent(detailEvent);
        }
    }

    async asyncCallApexMethod(filters) {
        return getDetailInfo({ code: filters.searchKey });
    }

    handleTabChange(event){

        // call apex fuction to re-render self
        // alert(event.target.value);
    }
}