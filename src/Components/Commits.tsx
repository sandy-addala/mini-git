import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment/moment.js";
import { useEffect, useState } from "react";

function Commits(props: any) {
  let [timer, setTimer] = useState(30);
  let [timerInterval, setTimerInterval] = useState<any>();

  useEffect(() => {
    let interval = setTimeout(() => {
      if (timer >= 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    setTimerInterval(interval);

    return () => {
      if (timer <= 0) {
        clearInterval(interval);
        setTimer(30);
        props.getCommits(props.repo, props.user);
      }
    };
  }, [timer]);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex" }}>
            <ArrowBackIcon
              style={{
                marginTop: "16px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              color="primary"
              fontSize="large"
              onClick={(e) => {
                clearInterval(timerInterval);
                props.setCommits(undefined);
              }}
            />
            <h4>
              {props.user}/{props.repo}
            </h4>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              onClick={(e) => {
                clearInterval(timerInterval);
                setTimer(30);
                props.getCommits(props.repo, props.user);
              }}
              style={{ height: "30px", alignSelf: "center" }}
              variant="contained"
            >
              Refresh
            </Button>
            <p> {timer}s </p>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 1000 }}> Author </TableCell>
                <TableCell style={{ fontWeight: 1000 }}> Message</TableCell>
                <TableCell style={{ fontWeight: 1000 }}> Sha</TableCell>
                <TableCell style={{ fontWeight: 1000 }}> Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.commits.map((row: any) => (
                <TableRow
                  key={row.sha}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.author}</TableCell>
                  <TableCell>{row.message}</TableCell>
                  <TableCell>{row.sha}</TableCell>
                  <TableCell>
                    {moment(row.date).format("MMM DD, hh:mm A")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Commits;
