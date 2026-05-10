
const searchBtn = document.getElementById("searchBtn");

// function for labels
const loadLabels = (labels) =>{

    // object for label colors
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

    // skip the config if no data find
    if(!config){
        return "";
    } 

    const div = `
        <div class='flex items-center ${config.bg} w-fit py-1 px-2 border-2 ${config.border} rounded-full gap-1 justify-center'>
            <img src='${config.icon}'>
            <span class="text-xs ${config.text}">${label}</span>
        </div>
    `;
    return div;
    });
    return result.join(" ");   
    
};

//  priority color change object

const priorityColors = {
    "high": "bg-[#FEECEC] text-[#EF4444] border-[rgb(245,202,202)]",
    "medium": "bg-[#FFF8DB] text-[#D97706] border-[rgb(253,238,138)]",
    "low": "bg-[#EEEFF2] text-[#9CA3AF] border-gray-300",
};

// status color

const statusColor = {
    "open": "border-t-4 border-[#00A96E]",
    "closed": "border-t-4 border-[#A855F7]"
};

// status img

const statusImg = {
    "open": "./assets/Open-Status.png",
    "closed": "./assets/Closed.png"
}


// function for remove active
const removeActive = () => {
    document.getElementById("btn-all").classList.remove("active");
    document.getElementById("btn-open").classList.remove("active");
    document.getElementById("btn-closed").classList.remove("active");   
    
};

// fetch all issue data
let allIssuesData = [];

const allIssues = () => {

    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
    .then((respond) => respond.json())
    .then((data) => {
        allIssuesData = data.data;
        displayIssues(allIssuesData);
    });

};

// display all issues
const displayIssues = (issues) => {

    const issueCount = document.getElementById("issue-count");

    issueCount.innerText = `${issues.length} issues`;

    const issuesContainer = document.getElementById("issue-container");
    issuesContainer.innerHTML="";

    issues.forEach ((issue) =>{
        const card = document.createElement("div");
        card.innerHTML = `
        <div onclick="loadIssueDetails(${issue.id})" class="space-y-3 bg-white rounded-lg shadow-md p-4 h-full flex flex-col 
        justify-between ${statusColor[issue.status]}">
                <div class="flex justify-between items-center">
                    <img src="${statusImg[issue.status]}">

                    <div>
                        <h3 class="w-fit border-2 px-6 py-1 rounded-full ${priorityColors[issue.priority]}"> 
                        <span class="text-xs">${issue.priority}</span></h3>
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
                <div class="px-4 space-y-1">
                    <p class="text-[#64748B] text-xs">${issue.author}</p>
                    <p class="text-[#64748B] text-xs">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>

                </div>
        `

        issuesContainer.appendChild(card);

    })
        
}; 

// display issues by status

const filterIssues = (status) => {

    removeActive();
    const buttons = document.getElementById(`btn-${status}`)
    buttons.classList.add("active");
    
    if(status === "all"){
        displayIssues(allIssuesData);
    } else{
        const filterIssue = allIssuesData.filter((issues) => issues.status === status );
        displayIssues(filterIssue);
    };
};

// fetch data for search

const searchHandle = (searchValue) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((respond) => respond.json())
    .then ((data) =>{
        displayIssues(data.data);
    });
};

searchBtn.addEventListener("click", () =>{

    const searchInput = document.getElementById("searchInput").value;
    searchHandle(searchInput);
});

// fetch single issue data
const loadIssueDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(url);
    const details = await response.json();
    
    displayIssuesDetails(details.data);
};
  
// display Issue details in the UI
const displayIssuesDetails = (details) => {

    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="py-4 px-3 flex flex-col gap-4">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-2xl">${details.title}</h2>
            <div class="flex gap-2 items-center">
                    <h3 class="text-white px-2 py-1 rounded-full ${details.status === 'open' ? 'bg-[#00A96E]' 
                        :'bg-[#A855F7]'}">${details.status}</h3>      
                    <ul class="flex text-xs text-[#64748B] gap-2 justify-center items-center">
                        <li>
                            ${details.author}
                        </li>
                        <li>
                            ${new Date(details.createdAt).toLocaleDateString()}
                        </li>
                    </ul>
            </div>
        </div>
        <div class="flex items-center gap-1 justify-start">
            ${loadLabels(details.labels)}
        </div>
            
        <p class="text-[#64748B] text-xs">${details.description}</p> 

        <div class="flex bg-[#F8FAFC] p-4 gap-10 justify-start">
            <div class="space-y-2">
                <h3 class="text-[#64748B] text-sm">Assignee:</h3>
                <h3 class="font-semibold">${details.author}</h3>
            </div>
            <div class="space-y-2">
                <p class="text-[#64748B] text-sm">Priority:</p>
                <h3 class="border-2 px-3 py-1 rounded-full ${priorityColors[details.priority]}"> 
                <span class="text-xs">${details.priority}</span></h3>
            </div>             
        </div>

    </div>
    
    `;

    document.getElementById("word_modal").showModal();

};


allIssues();
