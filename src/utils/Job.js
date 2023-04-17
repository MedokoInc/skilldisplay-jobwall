import Skill from "./Skill";
import Brand from "./Brand";
export default class Job {
  constructor(jobuid) {
    this.uid = jobuid;
  }
  uid;
  name = "Loading...";
  description = "Loading...";
  certificate = false;
  firstCategoryTitle = "Loading...";
  mediaPublicUrl = "Loading...";
  progress = {
    self: 2,
    education: 2,
    business: 2,
    certification: 2,
  };
  links = [];
  recommendedSkillSets = [];
  recommendedSkills = [];
  skillCount = 0;
  brand = Brand;
  skills = [];
  async fetch() {
    await this.fetchJobInfo(this.uid);
  }
  async fetchJobInfo(jobuid) {
    this.description = "Loading...";
    this.certificate = false;
    const url = "https://www.skilldisplay.eu/api/v1/skillset/" + jobuid;
    await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          this.name = data.name;
          this.description = data.description;
          this.certificate = data.certificate;
          this.firstCategoryTitle = data.firstCategoryTitle;
          this.mediaPublicUrl = data.mediaPublicUrl;
          this.progress = data.progress;
          this.links = data.links;
          this.recommendedSkillSets = data.recommendedSkillSets;
          this.recommendedSkills = data.recommendedSkills;
          this.skillCount = data.skillCount;
          this.brand = data.brand;
          for (const skill of data.skills) {
            const skillObject = new Skill(skill.uid);
            skillObject.progress = skill.progress;
            skillObject.title = skill.title;
            this.skills.push(skillObject);
          }
        } else this.couldNotReadJob();
      })
      .catch(() => {
        this.couldNotReadJob();
      });
  }
  couldNotReadJob() {}
}
