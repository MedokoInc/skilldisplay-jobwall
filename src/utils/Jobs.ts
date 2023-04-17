import Job from "./Job";

export default class Jobs {
  constructor() {
    this.jobs = [];
  }

  jobs: Job[];

  async fetch() {
    await this.fetchJobs("");
  }

  async fetchWithKey(key: string) {
    await this.fetchJobs(key);
  }

  private async fetchJobs(apiKey: string) {
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
          data.forEach((job: any) => {
            const newJob = new Job(job.uid);
            newJob.fetch();
            this.jobs.push(newJob);
          });
        }
      });
  }
}
