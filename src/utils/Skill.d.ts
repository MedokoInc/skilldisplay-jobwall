export default class Skill {
    constructor(skilluid: number);
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
    isVerified(): boolean;
    fetch(): Promise<void>;
    private fetchSkillInfo;
    private couldNotReadSkill;
    setTitle(title: string): void;
    setProgress(progress: any): void;
}
