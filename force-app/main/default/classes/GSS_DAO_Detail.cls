public with sharing class GSS_DAO_Detail {
    @AuraEnabled
    public String value1 { get; set; }
    @AuraEnabled
    public String value2 { get; set; }
    @AuraEnabled
    public String value3 { get; set; }
    @AuraEnabled
    public Object[] records { get; set; }
}
