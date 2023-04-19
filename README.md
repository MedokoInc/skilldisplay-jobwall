# SkillDisplay Jobwall - Custom Element Documentation

# Prerequisites

- Node.js (v.18.x.x or higher)

# Setup + Compilation

Install the packages

```bash
npm install
```

Then build the Vue Project to generate the importable JavaScript file.

```bash
npm run build
```

# Usage

You can use the elements like custom HTML elements. Here is an example

```jsx
<sd-job-view
	id="testJob"
	class="h-full"
	skills-expandable
	external-css-url="ext.css"
	uid="654"
/>
```

## sd-job-view

The `sd-job-view` component accepts the following properties.

| Property | Type | Description |
| --- | --- | --- |
| uid | number | The unique ID of the Skillset/Job to be displayed |
| verified-color | string (hex) | The color that signifies Validation. Affects the check circle color of the completed skills and the submit button color. Should be a hex value (e.g. #ff0000) |
| skills-detailed  | boolean | Dictates whether the Skills of the Skillset should be rendered with details (Description and Tags) |
| skills-expandable | boolean | Dictates whether there is a button on each Skill that allows for toggling the details |
| external-css-url | string | The path for the external CSS file used for styling |

## sd-skill

| Property | Type | Description |
| --- | --- | --- |
| uid | number | The unique ID of the Skill to be displayed |
| verified-color | string (hex) | The color that signifies Validation. Affects the check circle color of the completed skills and the submit button color. Should be a hex value (e.g. #ff0000) |
| detailed | boolean | Dictates whether the Skill should be rendered with details (Description and Tags) |
| expandable | boolean | Dictates whether there is a button on the Skill that allows for toggling the details |
| external-css-url | string | The path for the external CSS file used for styling |
| skill | Object | An existing Skill Object in JSON format |

# Custom Styling

Custom styling can be applied within the Web-Components with the use of an external CSS file. There are a variety of elements conveniently accessible via pre-defined class names.

<aside>
ℹ️ Note: Due to how CSS Specificity works, some of the default styles of elements need to be forcefully overridden by using the `!important` keyword in the external CSS file.

</aside>

| Class Name | Component | Description |
| --- | --- | --- |
| sd-skill | sd-job-view, sd-skill | Container of the Skill element |
| sd-skill-verified | sd-job-view, sd-skill | Gets applied to the Skill Container element if it is verified (checked) |
| sd-skill-title | sd-job-view, sd-skill | Title of the Skill element |
| sd-skill-description | sd-job-view, sd-skill | Description of the Skill element |
| sd-skill-tag | sd-job-view, sd-skill | Tag(s) of the Skill element |
| sd-skill-tags | sd-job-view, sd-skill | Container containing the Tags of the Skill element |
| sd-skill-details | sd-job-view, sd-skill | Container of the details of the Skill element (description, tags, etc.) |
| sd-skill-seperator | sd-job-view, sd-skill | Seperator between basic information of the Skill element and its details |
| animation-check | sd-job-view, sd-skill | Gets applied to the check circle once the skill gets verified |
| sd-skills | sd-job-view | Container of the Skill elements in the Job |
| sd-progress-[20, 40, … 100] | sd-job-view | Gets applied to the progress bar when its value is greater than XX%. Percentage value can be omitted to select the progress bar in general |
| sd-submit-progress-<20, 40, … 100> | sd-job-view | Gets applied to the submit button when the progress bar value is greater than XX% |

Below is an example for a usable external CSS file

```css
@keyframes check {
    0% {
        transform: scale(1);
    }
    20% {
        transform: scale(0.8);
    }
    40% {
        transform: scale(1.2);
    }
    60% {
        transform: scale(0.9);
    }
    80% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(56, 192, 61, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(56, 192, 61, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(56, 192, 61, 0);
    }
}

@keyframes jello-vertical {
    0% {
        transform: scale3d(1, 1, 1);
    }
    30% {
        transform: scale3d(0.95, 1.15, 1);
    }
    40% {
        transform: scale3d(1.15, 0.85, 1);
    }
    50% {
        transform: scale3d(0.95, 1.05, 1);
    }
    65% {
        transform: scale3d(1.02, 0.97, 1);
    }
    75% {
        transform: scale3d(0.97, 1.02, 1);
    }
    100% {
        transform: scale3d(1, 1, 1);
    }
}

.animation-check {
    animation: check 0.5s ease-in-out;
}

.sd-skill {
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.sd-submit-progress-40 {
    animation: pulse 1s infinite;
}

.sd-submit {
    border-radius: 5rem;
}

.sd-progress {
    background: linear-gradient(90deg, #f15a23 0%, #ff896f 100%);
}

.sd-progress-20 {
    background: linear-gradient(90deg, #f19223 0%, #ffbb6f 100%);
}

.sd-progress-40 {
    background: linear-gradient(90deg, #f1cf23 0%, #ffe26f 100%);
}

.sd-progress-60 {
    background: linear-gradient(90deg, #acf123 0%, #d6ff6f 100%);
}

.sd-progress-80 {
    background: linear-gradient(90deg, #5df123 0%, #98ff6f 100%);
}

.sd-progress-100 {
    background: linear-gradient(90deg, #239bf1 0%, #6fb7ff 100%);
}

.sd-skill-verified {
    animation: jello-vertical 0.9s;
}
```

# Currently Known Errors

- Authentication (API-Key & Mail) are only saved as a session and do not persist when site is reloaded
- After Authentication is called, the animation for checking a skill doesn’t properly display
- The Submit button calls `verifyCheckedSkills`, the verification of the Skills isn't possible
