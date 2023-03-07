export default class Brand {
    constructor(firstCategoryTitle: string, logoPublicUrl: string, memberCount: number, name: string, uid: number, url: string);
    brand: {
        uid: number;
        url: string;
        name: string;
        logoPublicUrl: string;
        memberCount: number;
        firstCategoryTitle: string;
    };
}
