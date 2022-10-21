import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment/moment.js";

function Commits(props: any) {
  return (
    <>
      <div>
        <div style={{ display: "flex", padding: "10px" }}>
          <ArrowBackIcon
            style={{
              marginTop: "16px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            color="primary"
            fontSize="large"
            onClick={(e) => props.setCommits(undefined)}
          />
          <h4>
            {props.user}/{props.repo}
          </h4>
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
