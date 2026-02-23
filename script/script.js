// console.log('Hello clicked');
let interviewlist = [];
let rejectedlist = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');
let sideBarJobs = document.getElementById('sideJobsBar');
// console.log(rejected);

const allbtn = document.getElementById('allBtn');
const interviewbtn = document.getElementById('interviewBtn');
const rejectebtn = document.getElementById('rejectBtn');

const allJobsSection = document.getElementById('allJobs');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filterSection');
// console.log(mainContainer);

// Dashboard counter update
function calculateCount() {
    const totalJobs = allJobsSection.children.length;
    total.innerText = totalJobs;//8
    interview.innerText = interviewlist.length;
    rejected.innerText = rejectedlist.length;
    sideBarJobs.innerText = allJobsSection.children.length;//8

    // Sidebar jobs dynamic
    if (currentStatus === 'allBtn') {
        sideBarJobs.innerText = `${totalJobs} jobs`; // all button always total
    } else if (currentStatus === 'interviewBtn') {
        sideBarJobs.innerText = `${interviewlist.length} of ${totalJobs} jobs`;
    } else if (currentStatus === 'rejectBtn') {
        sideBarJobs.innerText = `${rejectedlist.length} of ${totalJobs} jobs`;
    }
}
calculateCount();

//Toggle filter buttons 
function toggle(id) {
    allbtn.classList.remove('btn-primary');
    interviewbtn.classList.remove('btn-primary');
    rejectebtn.classList.remove('btn-primary');

    document.getElementById(id).classList.add('btn-primary');
    currentStatus = id;

    if (id == 'allBtn') {
        allJobsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if (id == 'interviewBtn') {
        allJobsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderListOrEmpty(interviewlist);
    } else if (id == 'rejectBtn') {
        allJobsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderListOrEmpty(rejectedlist);
    }

    calculateCount();
}

