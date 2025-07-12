const root = ReactDOM.createRoot(document.getElementById('root'));

const carsArr = [
    {serial: "A23B223", model: "Civic", company: "Honda", year: 2019},
    {serial: "C34D334", model: "Accord", company: "Honda", year: 2019},
    {serial: "E45F445", model: "Corolla", company: "Toyota", year: 2020},
    {serial: "G45H445", model: "Camry", company: "Toyota", year: 2019},
    {serial: "J65K556", model: "370z", company: "Nissan", year: 2017},
]

function Desk() {
    const cards = carsArr.map((car) =>
        <Card serial={car.serial} model={car.model} company={car.company} year={car.year} />
    );

    return <div>{cards}</div>;
}

class Card extends React.Component {
    render() {
        return <div key={this.props.serial} className={'card'}>
                    <h3>{this.props.model}</h3>
                    <h4>{this.props.company}</h4>
                    <div className={'year'}>{this.props.year}</div>
                    <p className={'serial'}>{this.props.serial}</p>
                </div>
    }
}


root.render(
    <div className={'wrapper'}>
        <div className={'cards'}>
            <Desk/>
        </div>
    </div>
);