export default class User {
    constructor(email) {
        this.mail = email;
    }
    mail = "";
    setMail(mail) {
        this.mail = mail;
    }
    verifySkill(skill, email, apiKey) {
        if (skill.progress.self == 2) {
            skill.pending = true;
            skill.fetch();
            if (email != "") {
                fetch("https://www.skilldisplay.eu/api/v1/verification/request", {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "x-api-key": apiKey,
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
                payload.Signature = CryptoJS.SHA256(JSON.stringify(payload) + "sdself").toString();
                fetch("https://www.skilldisplay.eu/api/v1/verification/confirm", {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
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
    }
}
