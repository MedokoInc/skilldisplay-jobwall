import Skill from "./Skill";
import Brand from "./Brand";
export default class Job {
    constructor(jobuid) {
        this.job.uid = jobuid;
    }
    job = {
        uid: 0,
        name: "Loading...",
        description: "Loading...",
        certificate: "Loading...",
        firstCategoryTitle: "Loading...",
        mediaPublicUrl: "Loading...",
        progress: {
            self: 2,
            education: 2,
            business: 2,
            certification: 2,
        },
        links: [],
    };
    brand = Brand;
    skills = [];
    async fetch() {
        await this.fetchJobInfo(this.job.uid);
    }
    async fetchJobInfo(jobuid) {
        this.job.description = "Loading...";
        this.job.certificate = "Loading...";
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
                this.job = data;
                this.brand = data.brand;
                for (const skill of data.skills) {
                    const skillObject = new Skill(skill.uid, skill.title, skill.progress);
                    this.skills.push(skillObject);
                }
            }
            else
                this.couldNotReadJob();
        })
            .catch(() => {
            this.couldNotReadJob();
        });
    }
    couldNotReadJob() {
        this.job = {
            uid: 0,
            name: "Job data unavailable",
            description: "Please check if a job with the given ID exists and if you have the permissions to read it.",
            certificate: "",
            firstCategoryTitle: "",
            mediaPublicUrl: "",
            progress: {
                self: 2,
                education: 2,
                business: 2,
                certification: 2,
            },
            links: [],
        };
    }
}
