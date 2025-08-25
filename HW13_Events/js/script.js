const tabsName = ['change', 'calculator', 'palindrome'];
const tabsContainer = document.getElementById('tabsContainer');
const tabsContainerContent = document.getElementById('tabsContainerContent');

function start() {
    let isActive = true;
    for (let tab of tabsName) {
        createTab(tab, isActive);
        isActive = false;
    }
}

function createTab(tab, isActive) {
    const newTab = document.createElement('li');
    newTab.classList.add('nav-item');
    newTab.role = 'presentation';
    const newBtn = document.createElement('button');
    newBtn.classList.add('nav-link');
    newBtn.id = tab + '-tab';
    newBtn.type = 'button';
    newBtn.setAttribute('data-bs-toggle', 'tab');
    newBtn.setAttribute('data-bs-target', '#' + tab + '-tab-pane');
    newBtn.setAttribute('role', 'tab');
    newBtn.setAttribute('aria-controls', tab + '-tab-pane');
    newBtn.setAttribute('aria-selected', '' + isActive);
    newBtn.textContent = capitalizeFirstLetter(tab);
    newTab.append(newBtn);
    tabsContainer.append(newTab);
    const newContent = document.createElement('div');
    newContent.classList.add('tab-pane', 'fade', 'show');
    if (isActive) {
        newBtn.classList.add('active');
        newContent.classList.add('show', 'active');
    }
    newContent.id = tab + '-tab-pane';
    newContent.role = 'tabpanel';
    newContent.setAttribute('aria-labelledby', tab + '-tab');
    newContent.tabIndex = 0;
    newContent.textContent = capitalizeFirstLetter(tab) + ' tab';
    tabsContainerContent.append(newContent);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const txt = `

<li class="nav-item" role="presentation">
    <button class="nav-link active" id="change-tab" data-bs-toggle="tab" data-bs-target="#change-tab-pane" type="button"
            role="tab" aria-controls="change-tab-pane" aria-selected="true">Change
    </button>
</li>
<li class="nav-item" role="presentation">
    <button class="nav-link active" id="change-tab" data-bs-toggle="change" data-bs-target="#change-tab-pane" type="button" 
            role="tab" aria-controls="change-tab-pane" aria-selected="true">Change
    </button>
</li>
        <div class="tab-pane fade show active" id="change-tab-pane" role="tabpanel" aria-labelledby="change-tab" tabindex="0">
            Change tab.
        </div>
`;