const resList = document.getElementById('res-list');

document.getElementById('chkBtn').addEventListener('click', async () => {
    const randomResult = new Promise((resolve, reject) => {
        setTimeout(function () {
            const randomBoolean = Math.random() > 0.6;
            for (let i = 0; i < Math.random() * 100 + 1; i++) {
                let result = i + 1;
            }
            resolve(randomBoolean);
        }, Math.random() * 250 + 1);

    });
    randomResult.then((res) => {
        const addedEl = document.createElement('div');
        let className = res? 'bg-success' : 'bg-danger';
        addedEl.classList.add(className);
        addedEl.textContent = '' + res;
        resList.append(addedEl);
    });
})