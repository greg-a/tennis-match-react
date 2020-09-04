import React from "react";
import session from "express-session";

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
                
                <button type="button" className="btn btn-primary"
                    onClick={props.handleFormSubmit}
                    >Search</button>
            </form>
        </div>
    )
}

export default ProposeMatchForm;