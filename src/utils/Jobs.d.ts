import Job from "./Job";
export default class Jobs {
  constructor();
  jobs: Job[];
  fetch(): Promise<void>;
  private fetchJobs;
}
