export default class Brand {
  constructor(
    firstCategoryTitle: string,
    logoPublicUrl: string,
    memberCount: number,
    name: string,
    uid: number,
    url: string
  ) {
    this.firstCategoryTitle = firstCategoryTitle;
    this.logoPublicUrl = logoPublicUrl;
    this.memberCount = memberCount;
    this.name = name;
    this.uid = uid;
    this.url = url;
  }

  uid: number = 0;
  url: String = "Loading...";
  name: String = "Loading...";
  logoPublicUrl: String = "Loading...";
  memberCount: number = 0;
  firstCategoryTitle: String = "Loading...";
}
