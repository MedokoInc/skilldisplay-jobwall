import Skill from "./Skill";
import Brand from "./Brand";
export default class Job {
    constructor(jobuid: number);
    job: {
        uid: number;
        name: string;
        description: string;
        certificate: string;
        firstCategoryTitle: string;
        mediaPublicUrl: string;
        progress: {
            self: number;
            education: number;
            business: number;
            certification: number;
        };
        links: never[];
    };
    brand: typeof Brand;
    skills: Skill[];
    fetch(): Promise<void>;
    private fetchJobInfo;
    private couldNotReadJob;
}
