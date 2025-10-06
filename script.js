var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // skills js
     // Animate vertical bars
//   document.querySelectorAll(".loadbar").forEach(bar => {
//     const fill = bar.querySelector(".fill");
//     const count = bar.querySelector(".count");
//     const target = parseInt(bar.dataset.percentage);
//     let current = 0;

//     setTimeout(() => { fill.style.width = target + "%"; }, 100);

//     let interval = setInterval(() => {
//       if(current < target){
//         current++;
//         count.textContent = current + "%";
//       } else {
//         clearInterval(interval);
//       }
//     }, 20);
//   });

  // Animate circular bars
//   document.querySelectorAll(".circle").forEach(circle => {
//     const progress = circle.querySelector(".progress");
//     const percentageText = circle.querySelector(".percentage");
//     const target = parseInt(circle.dataset.percentage);
//     const radius = 35;
//     const circumference = 2 * Math.PI * radius;
//     let current = 0;

//     progress.style.strokeDasharray = circumference;
//     progress.style.strokeDashoffset = circumference;

//     let interval = setInterval(() => {
//       if(current < target){
//         current++;
//         const offset = circumference - (current / 100) * circumference;
//         progress.style.strokeDashoffset = offset;
//         percentageText.textContent = current + "%";
//       } else {
//         clearInterval(interval);
//       }
//     }, 20);
//   }); 


// ------------------- Skills Section Animation (Optimized) -------------------

function animateSkills() {
    // Animate vertical bars
    document.querySelectorAll(".loadbar").forEach(bar => {
        const fill = bar.querySelector(".fill");
        const count = bar.querySelector(".count");
        const target = parseInt(bar.dataset.percentage);
        let current = 0;

        // Reset width and count before starting the animation (in case it runs again)
        fill.style.width = "0%";
        count.textContent = "0%";
        
        // Start the transition visually
        setTimeout(() => { fill.style.width = target + "%"; }, 100);

        let interval = setInterval(() => {
            if(current < target){
                current++;
                count.textContent = current + "%";
            } else {
                clearInterval(interval);
            }
        }, 20);
    });

    // Animate circular bars
    document.querySelectorAll(".circle").forEach(circle => {
        const progress = circle.querySelector(".progress");
        const percentageText = circle.querySelector(".percentage");
        const target = parseInt(circle.dataset.percentage);
        const radius = 35;
        const circumference = 2 * Math.PI * radius;
        let current = 0;

        progress.style.strokeDasharray = circumference;
        // Reset offset and percentage before starting the animation
        progress.style.strokeDashoffset = circumference; 
        percentageText.textContent = "0%";

        let interval = setInterval(() => {
            if(current < target){
                current++;
                const offset = circumference - (current / 100) * circumference;
                progress.style.strokeDashoffset = offset;
                percentageText.textContent = current + "%";
            } else {
                clearInterval(interval);
            }
        }, 20);
    });
}

// Function to set up the Intersection Observer
function setupSkillsObserver() {
    const skillsSection = document.getElementById('skills');

    if (!skillsSection) return; // Exit if the element doesn't exist

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills(); // Start animation
                observer.unobserve(entry.target); // Stop observing (only run once)
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(skillsSection);
}

// Execute the observer setup after the DOM is loaded
setupSkillsObserver();





// hamburger js
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
  document.querySelector(".hamburger").classList.toggle("active");
}

// Close menu when clicking a link
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav-links").classList.remove("show");
    document.querySelector(".hamburger").classList.remove("active");
  });
});


// portfolio builder section


// ------------------- About section word count -------------------
function countWords() {
    const textarea = document.getElementById("about");
    const wordCountLabel = document.getElementById("wordCount");

    let words = textarea.value.trim().split(/\s+/).filter(word => word.length > 0);
    let count = words.length;

    if (count > 300) {
        textarea.value = words.slice(0, 300).join(" ");
        count = 300;
    }

    wordCountLabel.textContent = `(${count}/300 words)`;
}

// ------------------- Skills section (dynamic tags) -------------------
const skillsInput = document.getElementById('skillsInput');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillsContainer = document.getElementById('skillsContainer');

// Add skill on + button click
addSkillBtn.addEventListener('click', () => {
    const skill = skillsInput.value.trim();
    if (skill !== "") {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `${skill} <button onclick="removeSkill(this)">x</button>`;
        skillsContainer.appendChild(skillItem);
        skillsInput.value = ""; // clear input
    }
});

// Remove skill function
function removeSkill(button) {
    button.parentElement.remove();
}

// ------------------- Projects -------------------
function addProject() {
    const container = document.getElementById("projectsContainer");
    const div = document.createElement("div");
    div.classList.add("entry-box");
    div.innerHTML = `
        <label>Project Name</label>
        <input type="text" class="project-name">
        <label>Description</label>
        <textarea class="project-desc"></textarea>
        <label>Deployment Link</label>
        <input type="url" class="project-link">
    `;
    container.appendChild(div);
}

// ------------------- Education -------------------
function addEducation() {
    const container = document.getElementById("educationContainer");
    const div = document.createElement("div");
    div.classList.add("entry-box");
    div.innerHTML = `
        <label>Institute</label>
        <input type="text" class="edu-institute">
        <label>Degree / Course</label>
        <input type="text" class="edu-degree">
        <label>Year</label>
        <input type="text" class="edu-year">
    `;
    container.appendChild(div);
}

// ------------------- Generate Portfolio -------------------
function generatePortfolio() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const about = document.getElementById("about").value;
    const linkedin = document.getElementById("linkedin").value;
    const github = document.getElementById("github").value;
    const twitter = document.getElementById("twitter").value;

    // Skills
    const skills = Array.from(document.querySelectorAll(".skill-item"))
                        .map(item => item.childNodes[0].textContent.trim());

    // Projects
    let projectsHTML = "";
    document.querySelectorAll(".entry-box .project-name").forEach((_, i) => {
        const pname = document.querySelectorAll(".project-name")[i].value;
        const desc = document.querySelectorAll(".project-desc")[i].value;
        const link = document.querySelectorAll(".project-link")[i].value;
        projectsHTML += `<li><strong>${pname}</strong><br>${desc}<br>${link ? `<a href="${link}" target="_blank">View Project</a>` : ""}</li>`;
    });

    // Education
    let educationHTML = "";
    document.querySelectorAll(".entry-box .edu-institute").forEach((_, i) => {
        const inst = document.querySelectorAll(".edu-institute")[i].value;
        const deg = document.querySelectorAll(".edu-degree")[i].value;
        const year = document.querySelectorAll(".edu-year")[i].value;
        educationHTML += `<li><strong>${inst}</strong> - ${deg} (${year})</li>`;
    });

    // Image upload
    const fileInput = document.getElementById("photo");

    function openPortfolio(uploadedImage = "") {
        const portfolioHTML = `
            ${uploadedImage ? `<img src="${uploadedImage}" alt="Profile Photo" class="profile-pic">` : ""}
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>

            <div class="portfolio-section">
                <h3>About Me</h3>
                <p>${about}</p>
            </div>

            <div class="portfolio-section">
                <h3>Skills</h3>
                <div class="skill-container">
                    ${skills.map(skill => `<div class="skill-item">${skill}</div>`).join("")}
                </div>
            </div>

            <div class="portfolio-section">
                <h3>Projects</h3>
                <ul>${projectsHTML}</ul>
            </div>

            <div class="portfolio-section">
                <h3>Education</h3>
                <ul>${educationHTML}</ul>
            </div>

            <div class="portfolio-section">
                <h3>Contact</h3>
                <ul>
                    ${linkedin ? `<li><a href="${linkedin}" target="_blank">LinkedIn</a></li>` : ""}
                    ${github ? `<li><a href="${github}" target="_blank">GitHub</a></li>` : ""}
                    ${twitter ? `<li><a href="${twitter}" target="_blank">Twitter</a></li>` : ""}
                </ul>
            </div>

            <button id="downloadBtn">Download PDF</button>
        `;

        const newWin = window.open("", "_blank");
        newWin.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${name}'s Portfolio</title>
                <link rel="stylesheet" href="style.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
            </head>
            <body>
                <div id="portfolioPreview">
                    ${portfolioHTML}
                </div>
                <script>
                    document.getElementById("downloadBtn").addEventListener("click", function () {
                        const element = document.getElementById("portfolioPreview");
                        html2pdf().set({
                            margin: 0.5,
                            filename: 'portfolio.pdf',
                            image: { type: 'jpeg', quality: 0.98 },
                            html2canvas: { scale: 2 },
                            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                        }).from(element).save();
                    });
                <\/script>
            </body>
            </html>
        `);
        newWin.document.close();
    }

    // Read uploaded photo if exists
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            openPortfolio(e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        openPortfolio();
    }
}



