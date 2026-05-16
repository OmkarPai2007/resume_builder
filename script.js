// =======================
// RESUME BUILDER APP
// =======================

const data = {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    photo: "",
    experience: [],
    education: [],
    skills: []
};

// =======================
// ELEMENTS
// =======================

const fullName = document.getElementById("fullName");
const jobTitle = document.getElementById("jobTitle");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const summary = document.getElementById("summary");

const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const previewContact = document.getElementById("previewContact");
const previewSummary = document.getElementById("previewSummary");

const previewExperience = document.getElementById("previewExperience");
const previewEducation = document.getElementById("previewEducation");
const previewSkills = document.getElementById("previewSkills");

const addExperienceBtn = document.getElementById("addExperience");
const addEducationBtn = document.getElementById("addEducation");
const addSkillBtn = document.getElementById("addSkill");

const experienceContainer = document.getElementById("experienceContainer");
const educationContainer = document.getElementById("educationContainer");
const skillsContainer = document.getElementById("skillsContainer");

const templateBtns = document.querySelectorAll(".template-btn");
const resumePreview = document.getElementById("resumePreview");

const themeToggle = document.getElementById("themeToggle");

const profileInput = document.getElementById("profileImage");
const profilePreview = document.getElementById("profileImagePreview");
const previewImage = document.getElementById("previewImage");
const profilePlaceholder = document.getElementById("profilePlaceholder");

const downloadBtn = document.getElementById("downloadBtn");

// =======================
// LOAD LOCAL STORAGE
// =======================

window.addEventListener("DOMContentLoaded", () => {

    const saved = localStorage.getItem("resumeData");

    if(saved){
        Object.assign(data, JSON.parse(saved));

        fullName.value = data.fullName;
        jobTitle.value = data.title;
        email.value = data.email;
        phone.value = data.phone;
        summary.value = data.summary;

        if(data.photo){
            profilePreview.src = data.photo;
            profilePreview.style.display = "block";

            previewImage.src = data.photo;
            previewImage.style.display = "block";

            profilePlaceholder.style.display = "none";
        }

        data.experience.forEach(addExperienceItem);
        data.education.forEach(addEducationItem);
        data.skills.forEach(addSkillItem);

        updatePreview();
    }

});

// =======================
// SAVE
// =======================

function saveData(){
    localStorage.setItem("resumeData", JSON.stringify(data));
}

// =======================
// LIVE INPUTS
// =======================

fullName.addEventListener("input", () => {
    data.fullName = fullName.value;
    updatePreview();
});

jobTitle.addEventListener("input", () => {
    data.title = jobTitle.value;
    updatePreview();
});

email.addEventListener("input", () => {
    data.email = email.value;
    validateEmail();
    updatePreview();
});

phone.addEventListener("input", () => {
    data.phone = phone.value;
    validatePhone();
    updatePreview();
});

summary.addEventListener("input", () => {
    data.summary = summary.value;
    updatePreview();
});

// =======================
// VALIDATION
// =======================

function validateEmail(){

    const error = document.getElementById("emailError");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(email.value) && email.value !== ""){
        error.innerText = "Invalid email";
    }else{
        error.innerText = "";
    }

}

function validatePhone(){

    const error = document.getElementById("phoneError");

    if(phone.value.length < 8 && phone.value !== ""){
        error.innerText = "Invalid phone";
    }else{
        error.innerText = "";
    }

}

// =======================
// UPDATE PREVIEW
// =======================

function updatePreview(){

    previewName.innerText = data.fullName || "Your Name";

    previewTitle.innerText = data.title || "Software Engineer";

    previewContact.innerText =
        `${data.email || "your@email.com"} • ${data.phone || "+91 XXXXX XXXXX"}`;

    previewSummary.innerText =
        data.summary || "Professional summary appears here...";

    renderExperiencePreview();
    renderEducationPreview();
    renderSkillsPreview();

    saveData();

}

// =======================
// EXPERIENCE
// =======================

addExperienceBtn.addEventListener("click", () => {

    const item = {
        role:"",
        company:"",
        start:"",
        end:"",
        description:""
    };

    data.experience.push(item);

    addExperienceItem(item);

    updatePreview();

});

function addExperienceItem(item){

    const div = document.createElement("div");

    div.className = "dynamic-item";

    div.innerHTML = `
        <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="grid-2">

            <div class="input-group">
                <label>Role</label>
                <input type="text" class="role" value="${item.role}">
            </div>

            <div class="input-group">
                <label>Company</label>
                <input type="text" class="company" value="${item.company}">
            </div>

            <div class="input-group">
                <label>Start</label>
                <input type="text" class="start" value="${item.start}">
            </div>

            <div class="input-group">
                <label>End</label>
                <input type="text" class="end" value="${item.end}">
            </div>

        </div>

        <div class="input-group">
            <label>Description</label>

            <textarea class="description">${item.description}</textarea>
        </div>
    `;

    experienceContainer.appendChild(div);

    const role = div.querySelector(".role");
    const company = div.querySelector(".company");
    const start = div.querySelector(".start");
    const end = div.querySelector(".end");
    const description = div.querySelector(".description");

    role.addEventListener("input", ()=>{
        item.role = role.value;
        updatePreview();
    });

    company.addEventListener("input", ()=>{
        item.company = company.value;
        updatePreview();
    });

    start.addEventListener("input", ()=>{
        item.start = start.value;
        updatePreview();
    });

    end.addEventListener("input", ()=>{
        item.end = end.value;
        updatePreview();
    });

    description.addEventListener("input", ()=>{
        item.description = description.value;
        updatePreview();
    });

    div.querySelector(".delete-btn").addEventListener("click", ()=>{

        div.remove();

        data.experience = data.experience.filter(e => e !== item);

        updatePreview();

    });

}

function renderExperiencePreview(){

    previewExperience.innerHTML = "";

    data.experience.forEach(item => {

        const div = document.createElement("div");

        div.className = "resume-item";

        div.innerHTML = `
            <h4>${item.role}</h4>

            <p>${item.company}</p>

            <p>${item.start} - ${item.end}</p>

            <p>${item.description}</p>
        `;

        previewExperience.appendChild(div);

    });

}

// =======================
// EDUCATION
// =======================

addEducationBtn.addEventListener("click", () => {

    const item = {
        degree:"",
        school:"",
        start:"",
        end:""
    };

    data.education.push(item);

    addEducationItem(item);

    updatePreview();

});

function addEducationItem(item){

    const div = document.createElement("div");

    div.className = "dynamic-item";

    div.innerHTML = `
        <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="grid-2">

            <div class="input-group">
                <label>Degree</label>
                <input type="text" class="degree" value="${item.degree}">
            </div>

            <div class="input-group">
                <label>School</label>
                <input type="text" class="school" value="${item.school}">
            </div>

            <div class="input-group">
                <label>Start</label>
                <input type="text" class="start" value="${item.start}">
            </div>

            <div class="input-group">
                <label>End</label>
                <input type="text" class="end" value="${item.end}">
            </div>

        </div>
    `;

    educationContainer.appendChild(div);

    const degree = div.querySelector(".degree");
    const school = div.querySelector(".school");
    const start = div.querySelector(".start");
    const end = div.querySelector(".end");

    degree.addEventListener("input", ()=>{
        item.degree = degree.value;
        updatePreview();
    });

    school.addEventListener("input", ()=>{
        item.school = school.value;
        updatePreview();
    });

    start.addEventListener("input", ()=>{
        item.start = start.value;
        updatePreview();
    });

    end.addEventListener("input", ()=>{
        item.end = end.value;
        updatePreview();
    });

    div.querySelector(".delete-btn").addEventListener("click", ()=>{

        div.remove();

        data.education = data.education.filter(e => e !== item);

        updatePreview();

    });

}

function renderEducationPreview(){

    previewEducation.innerHTML = "";

    data.education.forEach(item => {

        const div = document.createElement("div");

        div.className = "resume-item";

        div.innerHTML = `
            <h4>${item.degree}</h4>

            <p>${item.school}</p>

            <p>${item.start} - ${item.end}</p>
        `;

        previewEducation.appendChild(div);

    });

}

// =======================
// SKILLS
// =======================

addSkillBtn.addEventListener("click", ()=>{

    const item = {
        name:"",
        level:""
    };

    data.skills.push(item);

    addSkillItem(item);

    updatePreview();

});

function addSkillItem(item){

    const div = document.createElement("div");

    div.className = "dynamic-item";

    div.innerHTML = `
        <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="grid-2">

            <div class="input-group">
                <label>Skill</label>
                <input type="text" class="skill" value="${item.name}">
            </div>

            <div class="input-group">
                <label>Level</label>
                <input type="text" class="level" value="${item.level}">
            </div>

        </div>
    `;

    skillsContainer.appendChild(div);

    const skill = div.querySelector(".skill");
    const level = div.querySelector(".level");

    skill.addEventListener("input", ()=>{
        item.name = skill.value;
        updatePreview();
    });

    level.addEventListener("input", ()=>{
        item.level = level.value;
        updatePreview();
    });

    div.querySelector(".delete-btn").addEventListener("click", ()=>{

        div.remove();

        data.skills = data.skills.filter(s => s !== item);

        updatePreview();

    });

}

function renderSkillsPreview(){

    previewSkills.innerHTML = "";

    data.skills.forEach(item => {

        const span = document.createElement("span");

        span.className = "skill-badge";

        span.innerText =
            `${item.name} ${item.level ? "· " + item.level : ""}`;

        previewSkills.appendChild(span);

    });

}

// =======================
// PROFILE IMAGE
// =======================

profileInput.addEventListener("change", (e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        data.photo = event.target.result;

        profilePreview.src = data.photo;
        profilePreview.style.display = "block";

        previewImage.src = data.photo;
        previewImage.style.display = "block";

        profilePlaceholder.style.display = "none";

        saveData();

    };

    reader.readAsDataURL(file);

});

// =======================
// TEMPLATES
// =======================

templateBtns.forEach(btn=>{

    btn.addEventListener("click", ()=>{

        templateBtns.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        const template = btn.dataset.template;

        resumePreview.className = "resume";

        if(template === "modern"){
            resumePreview.classList.add("modern-template");
        }

        if(template === "compact"){
            resumePreview.classList.add("compact-template");
        }

        if(template === "classic"){
            resumePreview.classList.add("classic-template");
        }

    });

});

// =======================
// DARK MODE
// =======================

themeToggle.addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

});

window.addEventListener("DOMContentLoaded", ()=>{

    const theme = localStorage.getItem("theme");

    if(theme === "dark"){
        document.body.classList.add("dark");
    }

});

// =======================
// PDF EXPORT
// =======================

downloadBtn.addEventListener("click", ()=>{

    const element = document.getElementById("resumePreview");

    const options = {

        margin:0,

        filename:"resume.pdf",

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{
            scale:2
        },

        jsPDF:{
            unit:"mm",
            format:"a4",
            orientation:"portrait"
        }

    };

    html2pdf().set(options).from(element).save();

});

// =======================
// INITIAL
// =======================

updatePreview();