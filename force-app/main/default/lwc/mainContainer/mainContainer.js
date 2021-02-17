import { LightningElement } from 'lwc';
import {getConstants, getBreadCrumbs} from 'c/gssutil';

const CONSTANTS = getConstants();

export default class MaincContainer extends LightningElement {
    model={
        isloading: false,
        gtclassname: "normize",
        ggclassname: "invisible",
        giclassname: "invisible",
        breadcrumbs: [{
            id: CONSTANTS.GT005_ID,
            value:{
                id: CONSTANTS.GT005_ID,
                label: CONSTANTS.GT005_NAME,
                islast: true
            }
        }],
        nodecnt: null,
        data: {
            top: {
                t001:{
                    code:"",
                    kana:"",
                    broker1:"",
                    broker2:""
                }
            },
            list: {},
            detail: {}
        },
    }

    handleSnipperEvent(event){
        if (event.top != null){
            this.model = {
                ...this.model,
                isloading: event.detail.flag,
                data: {
                    ...this.model.data,
                    top: {
                        ...this.model.data.top,
                        t001: event.detail.t001
                    }
                }
            };
        }else{
            this.model = {
                ...this.model,
                isloading: event.detail.flag
            }
        }
        
    }

    handleShowDetailInfo(event){
        const dest = CONSTANTS.GG006_ID;
        const obj = this.addBreadCrumb(CONSTANTS.GG006_ID);
        this.model = {
            ...this.model,
            isloading: false,
            breadcrumbs: obj.breadcrumbs,
            nodecnt: obj.size,
            gtclassname: this.setHideShowCssName(CONSTANTS.GT005_ID, dest),
            ggclassname: this.setHideShowCssName(CONSTANTS.GG006_ID, dest),
            giclassname: this.setHideShowCssName(CONSTANTS.GI001_ID, dest)
        };
    }

    handleShowList(event){
        const dest = CONSTANTS.GI001_ID;
        const obj = this.addBreadCrumb(dest);
        this.model = {
            ...this.model,
            isloading: false,
            breadcrumbs: obj.breadcrumbs,
            nodecnt: obj.size,
            gtclassname: this.setHideShowCssName(CONSTANTS.GT005_ID, dest),
            ggclassname: this.setHideShowCssName(CONSTANTS.GG006_ID, dest),
            giclassname: this.setHideShowCssName(CONSTANTS.GI001_ID, dest)
        };
    }

    handleJump(event){
        const dest = event.detail.dest;
        const obj = this.deleteBreadCrumb(dest);
        this.model = {
            ...this.model,
            breadcrumbs: obj.breadcrumbs,
            nodecnt: obj.size,
            gtclassname: this.setHideShowCssName(CONSTANTS.GT005_ID, dest),
            ggclassname: this.setHideShowCssName(CONSTANTS.GG006_ID, dest),
            giclassname: this.setHideShowCssName(CONSTANTS.GI001_ID, dest)
        };
    }

    handleGotoPrev(event){
        const length = this.model.breadcrumbs.length;
        if (length <= 1) return;

        const prevPageId = this.model.breadcrumbs[length -2].value.id;
        const obj = this.deleteBreadCrumb(prevPageId);
        this.model = {
            ...this.model,
            breadcrumbs: obj.breadcrumbs,
            nodecnt: obj.size,
            gtclassname: this.setHideShowCssName(CONSTANTS.GT005_ID, prevPageId),
            ggclassname: this.setHideShowCssName(CONSTANTS.GG006_ID, prevPageId),
            giclassname: this.setHideShowCssName(CONSTANTS.GI001_ID, prevPageId)
        };
    }

    addBreadCrumb(pageId){

        const localbreadcrumbs = this.model.breadcrumbs;
        const length = localbreadcrumbs.length;

        const matchObj = getBreadCrumbs().filter(item=>item.id === pageId);
        localbreadcrumbs[length - 1].value.islast = false;

        localbreadcrumbs.push(matchObj[0]);
        return {breadcrumbs : localbreadcrumbs, size: localbreadcrumbs.length === 1 ? null : localbreadcrumbs.length };
    }

    deleteBreadCrumb(pageId){

        const localbreadcrumbs = this.model.breadcrumbs;
        const loc = localbreadcrumbs.findIndex(item=> item.id === pageId)
        localbreadcrumbs[loc].value.islast = true;
        return {breadcrumbs : localbreadcrumbs.slice(0, loc + 1 ), size: (loc + 1) === 1? null : (loc + 1)};

    }

    setHideShowCssName(current, dest){
        return current === dest ? CONSTANTS.ACTIVE: CONSTANTS.INACTIVE;
    }

    gotoTest(){
        // const ss = this.addBreadCrumb(CONSTANTS.GG006_ID)
        this.model = {
            ...this.model,
            isloading: false,
            breadcrumbs: this.addBreadCrumb(CONSTANTS.GG006_ID),
            nodecnt: this.getbreadcrumbsLength(),
            gtclassname: "invisible",
            ggclassname: "normize",
            giclassname: "invisible"
        };
    }
}