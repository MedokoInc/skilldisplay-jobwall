export default class Skill {
    constructor(skilluid: number, title: string, progress: any);
    skill: {
        uid: number;
        title: string;
        description: string;
        goals: string;
        tags: never[];
        progress: {
            self: number;
            education: number;
            business: number;
            certification: number;
        };
    };
    fetch(): Promise<void>;
    private fetchSkillInfo;
    private couldNotReadSkill;
}
