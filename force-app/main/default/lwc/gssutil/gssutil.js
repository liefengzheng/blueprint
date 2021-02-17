
const getConstants = () =>{
    return {
        GT005_ID: "gt005",
        GT005_NAME: "集団トップ",
        GI001_ID: "gi001",
        GI001_NAME: "集団検索結果一覧",
        GG006_ID: "gg006",
        GG006_NAME: "集団詳細",
        ACTIVE: 'normize',
        INACTIVE: 'invisible'
    }
};

const getBreadCrumbs = () => {
    return [{
        id: getConstants().GT005_ID,
        value:{
            id: getConstants().GT005_ID,
            label: getConstants().GT005_NAME,
            islast: true
        }
    },
    {
        id: getConstants().GI001_ID,
        value:{
            id: getConstants().GI001_ID,
            label: getConstants().GI001_NAME,
            islast: true
        }
    },
    {
        id: getConstants().GG006_ID,
        value:{
            id: getConstants().GG006_ID,
            label: getConstants().GG006_NAME,
            islast: true
        }
    }]
};

export {getConstants, getBreadCrumbs}