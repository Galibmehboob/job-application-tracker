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

//Handle job card clicks 
mainContainer.addEventListener('click', function (event) {

    // Apply Interview / Rejected
    if (event.target.classList.contains('btn-success') || event.target.classList.contains('btn-error')) {
        const parentCard = event.target.closest('#allJobs > div, #filterSection > div');
        if (!parentCard) return;

        const jobName = parentCard.querySelector('.jobName').innerText;
        const paraTitle = parentCard.querySelector('.paraTitle').innerText;
        const salary = parentCard.querySelector('.salary').innerText;
        const subTitle = parentCard.querySelector('.sub-title').innerText;

        const appliedStatus = event.target.classList.contains('btn-success') ? 'Interview' : 'Rejected';
        const cardInfo = {
            jobName,
            paraTitle,
            salary,
            applied: appliedStatus,
            subTitle
        };

        //  applied status
        const appliedEl = parentCard.querySelector('.applied');
        appliedEl.innerText = appliedStatus;
        if (appliedStatus === 'Interview') {
            appliedEl.classList.add('text-green-700', 'bg-green-200');
            appliedEl.classList.remove('text-gray-800', 'bg-gray-200', 'text-red-700', 'bg-red-200');
        } else {
            appliedEl.classList.add('text-red-700', 'bg-red-200');
            appliedEl.classList.remove('text-gray-800', 'bg-gray-200', 'text-green-700', 'bg-green-200');
        }

        // Add> interview  rejected 
        if (appliedStatus === 'Interview') {
            if (!interviewlist.find(item => item.jobName === jobName))
                interviewlist.push(cardInfo);
            rejectedlist = rejectedlist.filter(item => item.jobName !== jobName);
        } else if (!rejectedlist.find(item => item.jobName === jobName)) {
            rejectedlist.push(cardInfo);
            interviewlist = interviewlist.filter(i => i.jobName !== jobName);
        }
        toggle(currentStatus);
        calculateCount();

        // If current filter active, render
        if ((currentStatus === 'interviewBtn' && appliedStatus === 'Interview') ||
            (currentStatus === 'rejectBtn' && appliedStatus === 'Rejected')) {
            renderListOrEmpty(appliedStatus === 'Interview' ? interviewlist : rejectedlist);
        } else if (currentStatus === 'allBtn') {
            filterSection.classList.add('hidden');
            allJobsSection.classList.remove('hidden');
        }
    }

    // Delete Job 
    else if (event.target.closest('.btn-circle')) {
        const parentCard = event.target.closest('#allJobs > div, #filterSection > div');
        if (!parentCard) return;

        const jobName = parentCard.querySelector('.jobName').innerText;

        //dlt  from interview & rejected page
        interviewlist = interviewlist.filter(item => item.jobName !== jobName);
        rejectedlist = rejectedlist.filter(item => item.jobName !== jobName);

        // dlt from DOM
        parentCard.remove();

        calculateCount();

        //  if active
        if (currentStatus === 'interviewBtn') {
            renderListOrEmpty(interviewlist);
        } else if (currentStatus === 'rejectBtn') {
            renderListOrEmpty(rejectedlist);
        }
    }

});

