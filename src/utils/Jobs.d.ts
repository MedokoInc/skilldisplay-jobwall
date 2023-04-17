import Job from "./Job";
export default class Jobs {
    constructor();
    jobs: Job[];
    fetch(): Promise<void>;
    fetchWithKey(key: string): Promise<void>;
    private fetchJobs;
}
