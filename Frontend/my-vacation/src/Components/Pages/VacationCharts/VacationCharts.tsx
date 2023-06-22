import "./VacationCharts.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import { Button, Typography, Switch } from "@mui/material";


const url = "http://localhost:4000/api/v1/likes";

function VacationCharts(): JSX.Element {
    const [vacations, setVacations] = useState([]);
    const [showLiked, setShowLiked] = useState(true);
    const [filteredVacations, setFilteredVacations] = useState([]);

    useEffect(() => {
        const getData = async () => {
          try {
            const repsonse = await axios.get(`${url}/likesPerVacation`);
    
            setVacations(repsonse.data.vacations);
          } catch (err) {
            console.log(err);
          }
        };
        getData();
      }, []);
      useEffect(() => {
        if (showLiked) {
          const likedVacations = vacations.filter(
            (vacation: any) => vacation.likes > 0
          );
          setFilteredVacations(likedVacations);
        } else {
          setFilteredVacations(vacations);
        }
      }, [vacations, showLiked]);
    
      const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShowLiked(event?.target.checked);
      };
      const data = filteredVacations.map((vacation: any) => ({
        destination: vacation.destination,
        likes: vacation.likes,
      }));

    return (
        <div className="VacationCharts">
			      <div className="reportChart">
        <Typography variant="h4">Vacations Reports</Typography>
        <BarChart width={1400} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="destination" />
          <YAxis dataKey="likes" allowDecimals={false} tickCount={10} />
          <Tooltip />
          <Bar dataKey="likes" barSize={40} fill="#8884d8" />
        </BarChart>
      </div>
        </div>
    );
}

export default VacationCharts;
