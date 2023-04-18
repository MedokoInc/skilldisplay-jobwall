import Skill from "./Skill";
import Brand from "./Brand";
import CryptoJS from "crypto-js";

export default class Job {
  constructor(jobuid: number) {
    this.uid = jobuid;
  }

  uid: number;
  name: String = "Loading...";
  description: String = "Loading...";
  certificate: boolean = false;
  firstCategoryTitle: String = "Loading...";
  mediaPublicUrl: String = "Loading...";
  progress: Object = {
    self: 2,
    education: 2,
    business: 2,
    certification: 2,
  };
  links: Array<any> = [];
  recommendedSkillSets: Array<any> = [];
  recommendedSkills: Array<any> = [];
  skillCount: number = 0;

  brand = Brand;
  skills: Skill[] = [];

  async fetch() {
    await this.fetchJobInfo(this.uid, "");
  }

  async fetchWithKey(key: string) {
    this.skills = [];
    await this.fetchJobInfo(this.uid, key);
  }

  private async fetchJobInfo(jobuid: number, apiKey: string) {
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
        "x-api-key": apiKey,
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

  public verifyCheckedSkills(email: string, apiKey: string) {
    for (const skill of this.skills) {
      if (skill.progress.self == 0) {
        this.verifySkill(skill, email, apiKey);
      }
    }
  }

  private verifySkill(skill: Skill, email: string, apiKey: string) {
    skill.pending = true;
    if (email != "") {
      const payload = {
        SkillId: skill.uid,
        Level: "self",
        VerifierId: 0,
        CampaignId: 0,
        Username: email,
        AutoConfirm: true,
        Signature: "",
      };

      payload.Signature = CryptoJS.SHA256(
        JSON.stringify(payload) + "sdself"
      ).toString();

      fetch("https://www.skilldisplay.eu/api/v1/verification/confirm", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",

          "x-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            skill.pending = false;
            skill.progress.self = 0;
            skill.fetch();
          }
        });
    }
  }

  private couldNotReadJob() {}
}
