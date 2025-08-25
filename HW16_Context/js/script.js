let group =    {
    title: 'Java 10',
    students: ['Gena', 'Andrey', 'Elena', 'Anton'],
    showList: function () {
        const show = function (name) {
            console.log(`${this.title}: ${name}`);
        }
        this.students.forEach(show);
    }
}

let group1 =    {
    title: 'Java 10',
    students: ['Gena', 'Andrey', 'Elena', 'Anton'],
    showList: function () {
        const show = function(name) {
            console.log(`${group1.title}: ${name}`);
        }.bind(this);
        this.students.forEach(show);
    }
}

let groupArrow =    {
    title: 'Java 10',
    students: ['Group1Name1', 'Group1Name2', 'Group1Name3', 'Group1Name4'],
    showList: function () {
        const show = (name) => {
            console.log(`${this.title}: ${name}`);
        }
        this.students.forEach(show);
    }
}

console.log('1. group.showList() ================');
group.showList();
let newGroup = group;
console.log('1. newGroup.showList() =============');
newGroup.showList();
group = null;
console.log('==================');
newGroup.showList();

console.log('2. group1.showList() ================');
group1.showList();
newGroup = group1;
console.log('2. newGroup.showList() =============');
newGroup.showList();
group = null;
console.log('==================');
newGroup.showList();

console.log('2. =============');
groupArrow.showList()
ewGroup = groupArrow;
groupArrow = null;
console.log('==================');
newGroup.showList();
