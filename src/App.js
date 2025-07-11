import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles.css'

const phases = ["Red", "Yellow", "Blue"];

const PhaseCard = ({ title, data }) => (
  <div className="card">
    <h2 className="title">{title}</h2>
    <div className="grid">
      <div></div>
      {phases.map((phase) => (
        <div className="phase-header" key={phase}>
          <div className={`dot ${phase.toLowerCase()}`}></div>
          <div>{phase.toUpperCase()}</div>
        </div>
      ))}

      <div className="label">LINE VOLTAGE</div>
<div className="value-box red">
  {data ? data.Voltage_V12_meter_26 : "--"}
</div>
<div className="value-box yellow">
  {data ? data.Voltage_V23_meter_26 : "--"}
</div>
<div className="value-box blue">
  {data ? data.Voltage_V31_meter_26 : "--"}
</div>


      <div className="label">CURRENT</div>
      {phases.map((phase, i) => (
        <div key={phase + "C"} className={`value-box ${phase.toLowerCase()}`}>
          {data ? data[`Current_I${i + 1}_meter_26`] : "--"}
        </div>
      ))}

      <div className="label">ACTIVE POWER</div>
      {phases.map((phase) => (
        <div key={phase + "AP"} className={`value-box ${phase.toLowerCase()}`}>
          {data ? data.Total_KW_meter_26 : "--"}
        </div>
      ))}

      <div className="label">REACTIVE POWER</div>
      {phases.map((phase) => (
        <div key={phase + "RP"} className={`value-box ${phase.toLowerCase()}`}>
          {data ? data.Total_KVAR_meter_26 : "--"}
        </div>
      ))}

      <div className="label">POWER FACTOR</div>
      {phases.map((phase) => (
        <div key={phase + "PF"} className={`value-box ${phase.toLowerCase()}`}>
          {data ? data.Avg_PF_meter_26 : "--"}
        </div>
      ))}

      <div className="label">FREQUENCY</div>
{phases.map((phase) => (
  <div key={phase + "F"} className={`value-box ${phase.toLowerCase()}`}>
    {data ? data.Frequency_meter_26 : "--"}
  </div>
))}


    </div>
  </div>
);

export default function SubstationDashboard() {
  const [meterData, setMeterData] = useState(null);

useEffect(() => {
  const fetchData = () => {
    axios
      .get("https://server-substation.onrender.com/data/latest")
      .then((res) => setMeterData(res.data))
      .catch((err) => console.error("Error fetching meter data:", err));
  };

  // Initial fetch
  fetchData();

  // Set interval to refresh every 30 seconds (30000 ms)
  const intervalId = setInterval(fetchData, 500);

  // Clean up interval when component unmounts
  return () => clearInterval(intervalId);
}, []);


  return (
    <div className="container">
      <div className="top-bar">
        <div className="logo-group">
          <img src="/left-logo.png" alt="Left Logo" className="logo" />
          <div className="label-text">GREEN FUSION IoT SOLUTIONS</div>
        </div>
        <div className="center-text">132/11KV VISHNU SUBSTATION</div>
        <div className="logo-group right-align">
          <div className="label-text">VISHNU INSTITUTE OF TECHNOLOGY</div>
          <img src="/right-logo.png" alt="Right Logo" className="logo" />
        </div>
      </div>

      <div className="cards-row">
        <PhaseCard title="KOVVADA LINE" data={meterData} />
        
      </div>
    </div>
  );
}