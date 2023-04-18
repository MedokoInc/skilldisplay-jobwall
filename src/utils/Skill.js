export default class Skill {
    constructor(skilluid) {
        this.uid = skilluid;
    }
    uid;
    title = "Loading...";
    description = "Loading...";
    goals = "Loading...";
    owner = {
        uid: 0,
        firstName: "Loading...",
        lastName: "Loading...",
        userAvatar: "Loading...",
    };
    tags = [];
    links = [];
    progress = {
        self: 2,
        education: 2,
        business: 2,
        certification: 2,
    };
    pending = false;
    validated = false;
    isVerified() {
        return this.validated;
    }
    async fetch() {
        await this.fetchSkillInfo("");
    }
    async fetchWithKey(key) {
        await this.fetchSkillInfo(key);
    }
    async fetchSkillInfo(apiKey) {
        this.description = "Loading...";
        this.goals = "Loading...";
        await fetch(`https://www.skilldisplay.eu/api/v1/skill/${this.uid}`, {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
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
                if (this.progress.self === 0) {
                    this.validated = true;
                }
            }
            else
                this.couldNotReadSkill();
        })
            .catch(() => {
            this.couldNotReadSkill();
        });
    }
    couldNotReadSkill() {
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
        this.validated = false;
    }
    setTitle(title) {
        this.title = title;
    }
    setProgress(progress) {
        this.progress = progress;
    }
}
