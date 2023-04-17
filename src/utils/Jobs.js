import Job from "./Job";
export default class Jobs {
    constructor() {
        this.jobs = [];
    }
    jobs;
    async fetch() {
        await this.fetchJobs("");
    }
    async fetchWithKey(key) {
        await this.fetchJobs(key);
    }
    async fetchJobs(apiKey) {
        const url = "https://www.skilldisplay.eu/api/v1/skillsets";
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
                data.forEach((job) => {
                    const newJob = new Job(job.uid);
                    newJob.fetch();
                    this.jobs.push(newJob);
                });
            }
        });
    }
}
