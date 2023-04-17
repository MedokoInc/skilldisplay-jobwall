export default class Skill {
  constructor(skilluid: number) {
    this.uid = skilluid;
  }

  uid: number;
  title: String = "Loading...";
  description: String = "Loading...";
  goals: String = "Loading...";
  owner: Object = {
    uid: 0,
    firstName: "Loading...",
    lastName: "Loading...",
    userAvatar: "Loading...",
  };
  tags: Array<any> = [];
  links: Array<any> = [];
  progress = {
    self: 2,
    education: 2,
    business: 2,
    certification: 2,
  };
  pending: boolean = false;

  isVerified() {
    return this.progress.self === 0;
  }

  async fetch() {
    await this.fetchSkillInfo();
  }

  private async fetchSkillInfo() {
    this.description = "Loading...";
    this.goals = "Loading...";

    await fetch(`https://www.skilldisplay.eu/api/v1/skill/${this.uid}`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          this.title = data.title;
          this.description = data.description;
          this.goals = data.goals;
          this.owner = data.owner;
          this.tags = data.tags;
          this.links = data.links;
          this.progress = data.progress;
        } else this.couldNotReadSkill();
      })
      .catch(() => {
        this.couldNotReadSkill();
      });
  }

  private couldNotReadSkill() {
    this.title = "Skill data unavailable";
    this.description =
      "Please check if a skill with the given ID exists and if you have the permissions to read it.";
    this.goals = "";
    this.owner = {
      uid: 0,
      firstName: "Loading...",
      lastName: "Loading...",
      userAvatar: "Loading...",
    };
    this.tags = [];
    this.links = [];
    this.progress = {
      self: 2,
      education: 2,
      business: 2,
      certification: 2,
    };
  }

  setTitle(title: string) {
    this.title = title;
  }

  setProgress(progress: any) {
    this.progress = progress;
  }
}
