// function for labels
const loadLabels = (labels) =>{

    // object for all colors
    const labelColors = {
        "bug": {
            bg: "bg-[#FEECEC]",
            border: "border-[rgb(245,202,202)]",
            text: "text-[#EF4444]",
            icon: "./assets/bug.png"
        },
        "help wanted": {
            bg: "bg-[#FFF8DB]",
            border: "border-[rgb(253,238,138)]",
            text: "text-[#D97706]",
            icon: "./assets/help-logo.png"
        },
        "enhancement": {
            bg: "bg-[#F0FDF4]",
            border: "border-[rgb(187,247,208)]",
            text: "text-[#22C55E]",
            icon: "./assets/Open-Status.png"
        },
        "good first issue": {
            bg: "bg-[#EEF2FF]",
            border: "border-[rgb(199,210,254)]",
            text: "text-[#6366F1]",
            icon: "./assets/Closed.png"
        },
    };

    const result = labels.map((label) => {
    const config = labelColors[label];

    // config না পেলে skip করবে
    if(!config) return "";

    const div = `
        <div class='flex items-center ${config.bg} w-fit py-1 px-2 border-2 ${config.border} rounded-full gap-1 justify-center'>
            <img src='${config.icon}'>
            <span class="text-xs ${config.text}">${label}</span>
        </div>
    `;
    return div;
    });
    const finalResult = result.join("");
    return finalResult;
    
};
    
    // `<span class="badge bg-sky-100 p-4">${element}</span>`);
    // return status.join(" ");


// fetch all issue data

const allIssues = () => {

    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
    .then((respond) => respond.json())
    .then((data) => displayIssues(data.data));

};

// display all issues
const displayIssues = (issues) => {

    const issuesContainer = document.getElementById("issue-container");
    issuesContainer.innerHTML="";

    issues.forEach ((issue) =>{
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="space-y-3 bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between">
                <div class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png">

                    <div>
                        <h3 class="bg-[#FEECEC] w-fit border-2 border-[rgb(245,202,202)] px-6 py-1 rounded-full"> 
                        <span class="text-[#EF4444]">${issue.priority}</span></h3>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex flex-col justify-center gap-3">
                        <h2 class="font-semibold text-sm">${issue.title}</h2>
                        <p class="text-[#64748B] text-xs">${issue.description}</p>
                    </div>
                    <div class="flex items-center gap-1 justify-start">
                        ${loadLabels(issue.labels)}
                    </div>
                </div>

                <hr class="my-2 border-gray-300">
                <div class="px-4">
                    <p class="text-[#64748B]">#1 by john_doe</p>
                    <p class="text-[#64748B]">1/15/2024</p>
                </div>

                </div>
        `

        issuesContainer.appendChild(card);

    })
        
}; 



allIssues();
