export default class Brand {
  constructor(firstCategoryTitle, logoPublicUrl, memberCount, name, uid, url) {
    this.firstCategoryTitle = firstCategoryTitle;
    this.logoPublicUrl = logoPublicUrl;
    this.memberCount = memberCount;
    this.name = name;
    this.uid = uid;
    this.url = url;
  }
  uid = 0;
  url = "Loading...";
  name = "Loading...";
  logoPublicUrl = "Loading...";
  memberCount = 0;
  firstCategoryTitle = "Loading...";
}
