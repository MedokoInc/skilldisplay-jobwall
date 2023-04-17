import type Skill from "./Skill";
import CryptoJS from "crypto-js";

export default class User {
  constructor(apiKey: string, email: string) {
    this.apiKey = apiKey;
    this.mail = email;
  }

  apiKey: string;
  mail: string = "";

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  setMail(mail: string) {
    this.mail = mail;
  }

  private verifyAchievement(skill: Skill) {
    if (skill.progress.self == 2) {
      skill.pending = true;
      skill.fetch();

      fetch(`https://www.skilldisplay.eu/api/v1/profile/baseData`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let username = data.firstname + " " + data.lastname;
          let email = data.email;

          if (email != "") {
            fetch("https://www.skilldisplay.eu/api/v1/verification/request", {
              method: "POST",
              credentials: "same-origin",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
              body: new URLSearchParams({
                "tx_skills_api[tier]": "3",
                "tx_skills_api[skill]": skill.uid.toString(),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  skill.pending = false;
                  skill.progress.self = 0;
                  skill.fetch();
                }
              });

            const payload = {
              SkillId: skill.uid,
              Level: "self",
              VerifierId: 0,
              CampaignId: 0,
              Username: email,
              AutoConfirm: true,
              Signature: "",
            };
          }
        });
    }
  }
}
