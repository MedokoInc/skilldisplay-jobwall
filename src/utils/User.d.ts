export default class User {
    constructor(apiKey: string, email: string);
    apiKey: string;
    mail: string;
    setApiKey(apiKey: string): void;
    setMail(mail: string): void;
    private verifyAchievement;
}
