export default class Brand {
  constructor(
    firstCategoryTitle: string,
    logoPublicUrl: string,
    memberCount: number,
    name: string,
    uid: number,
    url: string
  ) {
    this.brand.firstCategoryTitle = firstCategoryTitle;
    this.brand.logoPublicUrl = logoPublicUrl;
    this.brand.memberCount = memberCount;
    this.brand.name = name;
    this.brand.uid = uid;
    this.brand.url = url;
  }

  brand = {
    uid: 0,
    url: "Loading...",
    name: "Loading...",
    logoPublicUrl: "Loading...",
    memberCount: 0,
    firstCategoryTitle: "Loading...",
  };
}
