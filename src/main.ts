import { createApp, defineCustomElement } from "vue";
import App from "./App.vue";

import CurrentTime from "./components/CurrentTime.ce.vue";
import SDSkill from "./components/SDSkill.ce.vue";

createApp(App).mount("#app");

const CurrentTimeElement = defineCustomElement(CurrentTime);
const SDSkillElement = defineCustomElement(SDSkill);

customElements.define("current-time", CurrentTimeElement);
customElements.define("sd-skill", SDSkillElement);

export { CurrentTimeElement, SDSkillElement };
