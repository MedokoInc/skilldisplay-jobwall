export default class Skill {
    constructor(skilluid: number);
    uid: number;
    title: String;
    description: String;
    goals: String;
    owner: Object;
    tags: Array<any>;
    links: Array<any>;
    progress: {
        self: number;
        education: number;
        business: number;
        certification: number;
    };
    pending: boolean;
    isVerified(): boolean;
    fetch(): Promise<void>;
    fetchWithKey(key: string): Promise<void>;
    private fetchSkillInfo;
    private couldNotReadSkill;
    setTitle(title: string): void;
    setProgress(progress: any): void;
}
