// eslint-disable-next-line react/prop-types
const StudyCheckBox = ({ onCheckboxChange, selectedGroup }) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className="label container">
                    <span className="label-text">XI</span>
                    <input type="checkbox" className={`checkbox ${selectedGroup === "XI" ? "selected" : ""}`}
                        checked={selectedGroup === "XI"}
                        onChange={() => onCheckboxChange("XI")}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label container">
                    <span className="label-text">XII</span>
                    <input type="checkbox" className={`checkbox ${selectedGroup === "XII" ? "selected" : ""}`}
                        checked={selectedGroup === "XII"}
                        onChange={() => onCheckboxChange("XII")}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label container">
                    <span className="label-text">Dropper</span>
                    <input type="checkbox" className={`checkbox ${selectedGroup === "Dropper" ? "selected" : ""}`}
                        checked={selectedGroup === "Dropper"}
                        onChange={() => onCheckboxChange("Dropper")}
                    />
                </label>
            </div>
        </div>
    )
}

export default StudyCheckBox;