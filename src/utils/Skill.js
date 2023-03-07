export default class Skill {
    constructor(skilluid) {
        this.skill.uid = skilluid;
    }
    skill = {
        uid: 0,
        title: "Loading...",
        description: "Loading...",
        goals: "Loading...",
        tags: [],
        progress: {
            self: 2,
            education: 2,
            business: 2,
            certification: 2,
        },
    };
    isVerified() {
        return this.skill.progress.self === 0;
    }
    async fetch() {
        await this.fetchSkillInfo();
    }
    async fetchSkillInfo() {
        this.skill.description = "Loading...";
        this.skill.goals = "Loading...";
        await fetch(`https://www.skilldisplay.eu/api/v1/skill/${this.skill.uid}`, {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
            if (data != null)
                this.skill = data;
            else
                this.couldNotReadSkill();
        })
            .catch(() => {
            this.couldNotReadSkill();
        });
    }
    couldNotReadSkill() {
        this.skill = {
            uid: 0,
            title: "Skill data unavailable",
            description: "Please check if a skill with the given ID exists and if you have the permissions to read it.",
            goals: "",
            tags: [],
            progress: {
                self: 2,
                education: 2,
                business: 2,
                certification: 2,
            },
        };
    }
    setTitle(title) {
        this.skill.title = title;
    }
    setProgress(progress) {
        this.skill.progress = progress;
    }
}
