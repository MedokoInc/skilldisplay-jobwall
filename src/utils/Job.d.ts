import Skill from "./Skill";
import Brand from "./Brand";
export default class Job {
    constructor(jobuid: number);
    uid: number;
    name: String;
    description: String;
    certificate: boolean;
    firstCategoryTitle: String;
    mediaPublicUrl: String;
    progress: Object;
    links: Array<any>;
    recommendedSkillSets: Array<any>;
    recommendedSkills: Array<any>;
    skillCount: number;
    brand: typeof Brand;
    skills: Skill[];
    fetch(): Promise<void>;
    fetchWithKey(key: string): Promise<void>;
    private fetchJobInfo;
    private verifyCheckedSkills;
    private verifySkill;
    private couldNotReadJob;
}
