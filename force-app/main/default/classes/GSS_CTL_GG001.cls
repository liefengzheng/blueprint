public with sharing class GSS_CTL_GG001 {
    public GSS_CTL_GG001() {
    }

    @AuraEnabled(cacheable=true)
    public static GSS_DAO_Detail getDetailInfo(String code){
        GSS_DAO_Detail detail = new GSS_DAO_Detail();
        
        if (code != '999999'){
            detail.value1 = 'dummy1';
            detail.value2 = 'dummy2';
            detail.value3 = 'dummy3';
        }
        return detail;
    }

}
