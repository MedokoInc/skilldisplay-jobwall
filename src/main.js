import { createApp, defineCustomElement } from "vue";
import App from "./App.vue";
import CurrentTime from "./components/CurrentTime.ce.vue";
import SDSkill from "./components/SDSkill.ce.vue";
import SDJobView from "./components/SDJobView.ce.vue";
createApp(App).mount("#app");
const CurrentTimeElement = defineCustomElement(CurrentTime);
const SDSkillElement = defineCustomElement(SDSkill);
const SDJobViewElement = defineCustomElement(SDJobView);
customElements.define("current-time", CurrentTimeElement);
customElements.define("sd-skill", SDSkillElement);
customElements.define("sd-job-view", SDJobViewElement);
export { CurrentTimeElement, SDSkillElement, SDJobView };
