import Button from "components/accessories/button/Button";
import React from "react";
import "./styles.scss";

export default function ActionStock() {
  return (
    <div>
      <div className="pharmaceuticalStock__buttonSet">
        <div className="buttonSet">
          <div className="export_button">
            <Button type="button" variant="outlined" color="inherit">
              Export list
            </Button>
          </div>
          <div className="report_button">
            <Button type="button" variant="outlined" color="inherit">
              Stock report
            </Button>
          </div>
        </div>
        <div className="buttonSet">
          <div className="discharge_button">
            <Button type="button" variant="contained">
              Discharge
            </Button>
          </div>
          <div className="charge_button">
            <Button type="button" variant="contained">
              Charge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
