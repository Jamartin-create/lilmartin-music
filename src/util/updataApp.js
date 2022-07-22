const updateData = () => {
    const paraseData = JSON.parse(localStorage.getItem('data'))
    const data = {
        ...paraseData
    }
    localStorage.setItem('data', JSON.stringify(data))
}

export default function () {
    updateData();
}