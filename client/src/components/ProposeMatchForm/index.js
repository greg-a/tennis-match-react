import React from "react";

function ProposeMatchForm(props) {
    return (
        <div>
            <h2>Search Date For Players</h2>
            <form>
                <div className="form-group">
                    <label for="newDate">Date</label>
                    <input type="date" className="form-control" id="newDate" name="newDate"
                        onChange={props.handleInputChange}
                        value={props.newDate}
                    />
                </div>
                
                <button type="button" className="btn"
                    onClick={props.handleFormSubmit}
                    >Search</button>
            </form>
            <br />
            <p>{props.instructions}</p>
        </div>
    )
}

export default ProposeMatchForm;