export default class Skill {
    constructor(uidOrData) {
        if (typeof uidOrData === 'number') {
            this.skill.uid = uidOrData;
        }
        else {
            this.skill.uid = uidOrData.uid;
            this.skill.title = uidOrData.title;
            this.skill.progress = uidOrData.progress;
        }
    }
    skill = {
        uid: 0,
        title: 'Loading...',
        description: 'Loading...',
        goals: 'Loading...',
        tags: [],
        progress: {
            self: 2,
            education: 2,
            business: 2,
            certification: 2
        }
    };
    async fetch() {
        await this.fetchSkillInfo();
    }
    async fetchSkillInfo() {
        this.skill.description = 'Loading...';
        this.skill.goals = 'Loading...';
        await fetch(`https://www.skilldisplay.eu/api/v1/skill/${this.skill.uid}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
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
            title: 'Skill data unavailable',
            description: 'Please check if a skill with the given ID exists and if you have the permissions to read it.',
            goals: '',
            tags: [],
            progress: {
                self: 2,
                education: 2,
                business: 2,
                certification: 2
            }
        };
    }
    verifySkill() {
    }
}
