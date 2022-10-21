import { Button, Divider, List, ListItem, TextField } from "@mui/material";
import { Octokit } from "@octokit/core";
import { useState } from "react";

function Repos(props: any) {
  const octokit = new Octokit({
    auth: props.accessKey,
  });

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  let [repos, setRepos] = useState<any[]>([]);

  function handleSubmit(e: any) {
    e.preventDefault();
    searchRepos();
  }

  const searchRepos = () => {
    setLoading(true);
    octokit
      .request("GET /users/{username}/repos", {
        username: userName,
      })
      .then((response) => {
        let { data } = response;
        setLoading(false);
        setRepos(data);
      })
      .catch((error) => {
        setLoading(false);
        setRepos([]);
      });
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <TextField
          id="outlined-basic"
          label="user-name"
          variant="outlined"
          size="small"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {repos.length == 0 && (
        <div>
          <Divider light />
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "ddd",
            }}
          >
            <h2> Enter valid user Name to fetch repos </h2>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div>
          <h3> Repositories </h3>
          <Divider light />

          <List>
            {repos.map((repo) => (
              <div key={repo.id}>
                <ListItem
                  onClick={(e) => props.getCommits(repo.name, userName)}
                >
                  {repo.name}
                </ListItem>
                <Divider light component="li" />
              </div>
            ))}
          </List>
        </div>
      )}
    </>
  );
}

export default Repos;
