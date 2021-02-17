import { LightningElement, api, wire } from 'lwc';
import {
    publish,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import FILTERSCHANGEMC from '@salesforce/messageChannel/FiltersChange__c';

const PAGE_SIZE = 9;
const STATE_ALL = 'All'

export default class Gi001 extends LightningElement {
    @api classname;

    pageNumber = 1;
    pageSize = PAGE_SIZE;
    value = STATE_ALL;

    get currentPageNumber(){
        return this.pageNumber;
    }

    get totalPages(){
        return Math.ceil(this.grpNameSearchResultInfoDto.count / this.pageSize);
    }

    get isLastPage() {
        return this.pageNumber >= this.totalPages;
    }

    get groupRecords(){
        let groupRecords = this.grpNameSearchResultInfoDto.groupRecords;
        if (this.value != STATE_ALL){
            return groupRecords.filter(item => item.grpStatusCode == this.value);
        }
        return groupRecords;
    }

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
        if (filters.searchType == 'kana') {

            this.detailInfo = await this.asyncCallApexMethod(filters);

            // call apex method to search value
            const listEvent = new CustomEvent('showlistevent', { detail: {}});
            // Dispatches the event.
            this.dispatchEvent(listEvent);
        }
    }

    async asyncCallApexMethod(filters) {
        // return getDetailInfo({ kana: filters.searchKey });
        return this.grpNameSearchResultInfoDto;
    }

    handleChange(event){
        this.value = event.detail.value;
        // alert(this.value);
        return this.groupRecords;
    }

    handleItemClik(event){
        this.enableSnipper(event);
        //public search detail topic

        const filters = {
            searchKey: event.target.dataset.id,
            searchType: 'code'
        };
        publish(this.messageContext, FILTERSCHANGEMC, filters);

    }

    enableSnipper(event){
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();
        // Creates the event with the contact ID data.
        
        const snipperEvent = new CustomEvent('snipperevent', { detail: {flag: true}});
        // Dispatches the event.
        this.dispatchEvent(snipperEvent);
    }

    
    get options(){
        return [
            { label: '全て', value: STATE_ALL},
            { label: '人数未達（6ヶ月以内）', value: '100'},
            { label: '団体撤回', value: '190'},
            { label: '正常', value: '000'}
        ]
    };

    grpNameSearchResultInfoDto = {
        q211TranMessage: null,
        count: 3,
        groupRecords: [
            {
                grpStatusCode: '000',
                grpCode: '990001',
                groupStatusName: '正常',
                grpNmeKj: '集団名漢字１',
                grpNmeSglKn: '集団名カタカナ１',
                zip: '100-0001',
                telNo: '080-0000-0001',
                grpOperatorCode: '0001'

            },
            {
                grpStatusCode: '100',
                grpCode: '990002',
                groupStatusName: '人数未達（6ヶ月以内）',
                grpNmeKj: '集団名漢字２',
                grpNmeSglKn: '集団名カタカナ２',
                zip: '100-0002',
                telNo: '080-0000-0002',
                grpOperatorCode: '0002'

            },
            {
                grpStatusCode: '190',
                grpCode: '990003',
                groupStatusName: '団体撤回',
                grpNmeKj: '集団名漢字３',
                grpNmeSglKn: '集団名カタカナ３',
                zip: '100-0003',
                telNo: '080-0000-0003',
                grpOperatorCode: '0003'

            }
        ]
    };

    
    
}